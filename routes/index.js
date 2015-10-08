var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'upload',
        angularApp: 'UploadApp'
    });
});

router.post('/upload', upload.array('myFile'), function (req, res) {
    console.log(req.files);

    res.status(201);
});

module.exports = router;
