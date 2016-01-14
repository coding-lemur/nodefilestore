var express = require('express');
var router = express.Router();
var config = require('config');
var mongo = require('mongodb');
var database = undefined;
var gfs = undefined;
var Grid = require('gridfs-stream');
var httpError = require('../helper/httpError');
var ZipStream = require('zip-stream');

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
        title: 'nodefilestore'
    });
});

router.get('/download/:token', function(req, res, next) {
    var now = new Date();

    database
        .collection('uploads')
        .find({
            'token': req.params.token,
            'expirationDate': { '$gte': now }
        })
        .limit(1)
        .next(function(err, upload) {
            if (err) {
                return next(httpError.createError(500, err));
            }

            if (!upload) { // download token not found or expired
                var fileNotFoundError = httpError.createError(404);
                fileNotFoundError.isFromDownloadRoute = true;
                return next(fileNotFoundError);
            }

            var fileIds = upload.files;

            gfs
                .files
                .find({ '_id': { $in: fileIds }})
                .toArray(function(err, files) {
                    if (err) {
                        return next(httpError.createError(500, err));
                    }

                    if (!files || files.length === 0) { // file(s) not found
                        var fileNotFoundError = httpError.createError(404);
                        fileNotFoundError.isFromDownloadRoute = true;
                        return next(fileNotFoundError);
                    }

                    if (files.length === 1) { // single file
                        var file = files[0];

                        // stream download
                        res.setHeader('Content-disposition', 'attachment; filename=' + file.filename);
                        res.setHeader('Content-type', file.contentType);
                        res.setHeader('Content-length', file.length);

                        var readStream = gfs.createReadStream({ _id: file._id });
                        readStream.pipe(res);
                    }
                    else { // multiple files
                        var archive = new ZipStream();
                        archive.on('error', function(err) {
                            throw err;
                        });

                        // prepare header
                        res.setHeader('Content-disposition', 'attachment; filename=bundle.zip');
                        res.setHeader('Content-type', 'application/zip');

                        archive.pipe(res);

                        var zipFile = function(fileIndex) {
                            if (fileIndex >= files.length) {
                                archive.finalize();
                                return;
                            }

                            var currentFile = files[fileIndex];
                            var readStream = gfs.createReadStream({ _id: currentFile._id });

                            archive.entry(readStream, {
                                name: currentFile.filename
                            }, function(err, entry) {
                                if (err) {
                                    throw err;
                                }

                                // add next entry
                                zipFile(++fileIndex);
                            });
                        };

                        zipFile(0);
                    }
                });
        });
});

module.exports = router;
