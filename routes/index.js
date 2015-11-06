var express = require('express');
var router = express.Router();

/* GET home page. */
// the "*" enables HTML5Mode by forwarding missing files to the index.html
router.get('/*', function(req, res, next) {
    res.render('index', {
        title: 'upload',
        angularApp: 'UploadApp'
    });
});

module.exports = router;
