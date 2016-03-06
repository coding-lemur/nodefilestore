import express from 'express';
import config from 'config';
import multer from 'multer';
import gridfsStorageEngine from 'gridfs-storage-engine';
import mongo from 'mongodb';
import httpError from '../helper/httpError';
import uuid from 'node-uuid';
import moment from 'moment';

const router = express.Router();
const gridfsStorage = gridfsStorageEngine({ url: config.database.connection });
const uploadStorage = multer({ storage: gridfsStorage });

let database = undefined;

// connect to MongoDB
mongo.MongoClient.connect(config.database.connection, (err, db) => {
    if (err) {
        throw err;
    }

    database = db;
});

function insertUpload(fileIds, callback) {
    const currentDate = new Date();
    const expirationDate = moment(currentDate).add(7, 'days').toDate();
    const upload = {
        token: uuid.v4(),
        files: fileIds,
        createDate: currentDate,
        expirationDate: expirationDate
    };

    database
        .collection('uploads')
        .insertOne(upload, (err, result) => {
            callback(err, result, upload);
        });
}

router.post('/upload', uploadStorage.array('files'), (req, res, next) => {
    const fileIds = req.files.map((file) => {
        return file.gridfsEntry._id;
    });

    insertUpload(fileIds, (err, result, upload) => {
        if (err) {
            return next(httpError.createError(500, err));
        }

        return res.status(201).json({
            token: upload.token,
            expirationDate: upload.expirationDate,
            downloadUrl: config.baseUrl + '/download/' + upload.token
        });
    });
});

router.get('/download/:token', (req, res) => {
    res.redirect(301, '/download/' + req.params.token);
});

export default router;
