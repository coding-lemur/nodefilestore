var express = require('express');
var router = express.Router();
var config = require('config');
var multer = require('multer');
var gridfsStorage = require('gridfs-storage-engine')({ url: config.database.connection });
var upload = multer({ storage: gridfsStorage });
var mongo = require('mongodb');
var database = undefined;
var gfs = undefined;
var Grid = require('gridfs-stream');
var httpError = require('../helper/httpError');
var uuid = require('node-uuid');
var moment = require('moment');

// connect to MongoDB
mongo.MongoClient.connect(config.database.connection, function(err, db) {
    if (err) {
        throw err;
    }

    database = db;

    gfs = new Grid(database, mongo);
});

router.post('/upload', upload.array('files'), function(req, res, next) {
    var fileIds = [ req.files[0].gridfsEntry._id ];

    insertUpload(fileIds, function(err, result, upload) {
        if (err) {
            return next(httpError.createError(500, err));
        }

        res.status(201).json({
            token: upload.token,
            expirationDate: upload.expirationDate
        });
    });
});

router.get('/files/:token', function(req, res, next) {
    database
        .collection('uploads')
        .find({ token: req.param('token') })
        .limit(1)
        .next(function(err, upload) {
            if (err) {
                return next(httpError.createError(500, err));
            }

            var now = new Date();

            if (now > upload.expirationDate) { // expired
                res.status(404);
            }
            else {
                var fileId = upload.files[0];

                gfs
                    .files
                    .find({ _id: fileId })
                    .limit(1)
                    .next(function(err, file) {
                        if (err) {
                            return next(httpError.createError(500, err));
                        }

                        // stream download
                        res.setHeader('Content-disposition', 'attachment; filename=' + file.filename);
                        res.setHeader('Content-type', file.contentType);

                        var readStream = gfs.createReadStream({ _id: fileId });
                        readStream.pipe(res);
                    });
            }
        });
});

function insertUpload(fileIds, callback) {
    var currentDate = new Date();
    var upload = {
        token: uuid.v4(),
        files: fileIds,
        createDate: currentDate,
        expirationDate: moment(currentDate).add(7, 'days').toDate()
    };

    database
        .collection('uploads')
        .insertOne(upload, function(err, result) {
            callback(err, result, upload)
        });
}

module.exports = router;