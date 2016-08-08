import express from 'express';
import config from 'config';
import mongo from 'mongodb';
import Grid from 'gridfs-stream';
import httpError from '../helper/httpError';
import ZipStream from 'zip-stream';
import path from 'path';

const router = express.Router();

let database = undefined;
let gfs = undefined;

/*
// connect to MongoDB
mongo.MongoClient.connect(config.database.connection, (err, db) => {
    if (err) {
        throw err;
    }

    database = db;

    gfs = new Grid(database, mongo);
});
*/

/* GET home page. */
router.get('/', (req, res) => {
    const rootPath =  path.resolve(__dirname, '..');
    res.sendFile(path.join(rootPath, 'index.html'));
});

/*
function handleMultipleFiles(files, res) {
    const archive = new ZipStream();
    archive.on('error', (error) =>{
        throw error;
    });

    // prepare header
    res.setHeader('Content-disposition', 'attachment; filename=bundle.zip');
    res.setHeader('Content-type', 'application/zip');

    archive.pipe(res);

    const zipFile = (fileIndex) => {
        if (fileIndex >= files.length) {
            archive.finalize();
            return;
        }

        const currentFile = files[fileIndex];
        const readStream = gfs.createReadStream({ _id: currentFile._id });

        archive.entry(readStream, {
            name: currentFile.filename
        }, (err) => {
            if (err) {
                throw err;
            }

            // add next entry
            const newFileIndex = fileIndex + 1;
            zipFile(newFileIndex);
        });
    };

    zipFile(0);
}

router.get('/download/:token', (req, res, next) => {
    const now = new Date();

    database
        .collection('uploads')
        .find({
            'token': req.params.token,
            'expirationDate': { '$gte': now }
        })
        .limit(1)
        .next((err, upload) => {
            if (err) {
                return next(httpError.createError(500, err));
            }

            if (!upload) { // download token not found or expired
                const fileNotFoundError = httpError.createError(404);
                fileNotFoundError.isFromDownloadRoute = true;
                return next(fileNotFoundError);
            }

            const fileIds = upload.files;

            gfs
                .files
                .find({ '_id': { $in: fileIds }})
                .toArray((error, files) => {
                    if (error) {
                        return next(httpError.createError(500, error));
                    }

                    if (!files || files.length === 0) { // file(s) not found
                        const fileNotFoundError = httpError.createError(404);
                        fileNotFoundError.isFromDownloadRoute = true;
                        return next(fileNotFoundError);
                    }

                    if (files.length === 1) { // single file
                        const file = files[0];

                        // stream download
                        res.setHeader('Content-disposition', 'attachment; filename=' + file.filename);
                        res.setHeader('Content-type', file.contentType);
                        res.setHeader('Content-length', file.length);

                        const readStream = gfs.createReadStream({ _id: file._id });
                        readStream.pipe(res);
                    }
                    else { // multiple files
                        handleMultipleFiles(files, res);
                    }
                });
        });
});
*/

export default router;
