var express = require('express');
var router = express.Router();
var config = require('config');
var multer  = require('multer');
var gridfsStorage = require('gridfs-storage-engine')({ url: config.database.connection });
var upload = multer({ storage: gridfsStorage });

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'upload',
        angularApp: 'UploadApp'
    });
});

router.post('/upload', upload.array('files'), function (req, res) {
    var id = req.files[0].gridfsEntry._id.toJSON();

    res.status(201).json({ id: id });
});

router.get('/files/:id', function (req, res) {
    res.status(200);
});

module.exports = router;
