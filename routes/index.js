var express = require('express');
var router = express.Router();
var config = require('config');
var multer  = require('multer');
var gridfsStorage = require('gridfs-storage-engine')({ url: config.database.connection });
var upload = multer({ storage: gridfsStorage });
var MongoClient = require('mongodb').MongoClient;
var httpError = require('../helper/httpError');
var uuid = require('node-uuid');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        title: 'upload',
        angularApp: 'UploadApp'
    });
});

router.post('/upload', upload.array('files'), function(req, res, next) {
    //var id = req.files[0].gridfsEntry._id.toJSON();
    var fileIds = [req.files[0].gridfsEntry._id];

    MongoClient.connect(config.database.connection, function(err, db) {
        if (err) {
            return next(httpError.createError(500, err));
        }

        insertUpload(db, fileIds, function(err, result, upload) {
            if (err) {
                return next(httpError.createError(500, err));
            }

            db.close();

            res.status(201).json({ token: upload.token });
        });
    });
});

router.get('/files/:id', function (req, res) {
    res.status(200);
});

function insertUpload(db, fileIds, callback) {
    var collection = db.collection('uploads');
    var upload = {
        token: uuid.v4(),
        files: fileIds,
        createDate: new Date()
    };

    collection.insertMany([upload], function(err, result) {
        callback(err, result, upload)
    });
}

module.exports = router;
