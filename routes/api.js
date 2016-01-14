var express = require('express');
var router = express.Router();
var config = require('config');
var multer = require('multer');
var gridfsStorage = require('gridfs-storage-engine')({ url: config.database.connection });
var upload = multer({ storage: gridfsStorage });
var mongo = require('mongodb');
var database = undefined;
var httpError = require('../helper/httpError');
var uuid = require('node-uuid');
var moment = require('moment');

// connect to MongoDB
mongo.MongoClient.connect(config.database.connection, function(err, db) {
    if (err) {
        throw err;
    }

    database = db;
});

router.post('/upload', upload.array('files'), function(req, res, next) {
    var fileIds = req.files.map(function(file) {
        return file.gridfsEntry._id;
    });

    insertUpload(fileIds, function(err, result, upload) {
        if (err) {
            return next(httpError.createError(500, err));
        }

        res.status(201).json({
            token: upload.token,
            expirationDate: upload.expirationDate,
            downloadUrl: config.baseUrl + '/download/' + upload.token
        });
    });
});

router.get('/download/:token', function(req, res) {
    res.redirect(301, '/download/' + req.params.token);
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