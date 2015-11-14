var express = require('express');
var router = express.Router();
var config = require('config');
var mongo = require('mongodb');
var database = undefined;
var gfs = undefined;
var Grid = require('gridfs-stream');
var httpError = require('../helper/httpError');

// connect to MongoDB
mongo.MongoClient.connect(config.database.connection, function(err, db) {
    if (err) {
        throw err;
    }

    database = db;

    gfs = new Grid(database, mongo);
});

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'nodefilestore',
        angularApp: 'uploadApp'
    });
});

router.get('/download/:token', function(req, res, next) {
    database
        .collection('uploads')
        .find({ 'token': req.params.token })
        .limit(1)
        .next(function(err, upload) {
            if (err) {
                return next(httpError.createError(500, err));
            }

            var now = new Date();

            if (!upload || now > upload.expirationDate) { // expired
                res.sendStatus(404);
            }
            else {
                var fileId = upload.files[0];

                gfs
                    .files
                    .find({ '_id': fileId })
                    .limit(1)
                    .next(function(err, file) {
                        if (err) {
                            return next(httpError.createError(500, err));
                        }

                        // stream download
                        res.setHeader('Content-disposition', 'attachment; filename=' + file.filename);
                        res.setHeader('Content-type', file.contentType);
                        res.setHeader('Content-length', file.length);

                        var readStream = gfs.createReadStream({ _id: fileId });
                        readStream.pipe(res);
                    });
            }
        });
});

module.exports = router;
