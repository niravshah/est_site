var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
        res.render('index');
});

router.get('/products/pitch-deck-tech', function(req, res) {
        res.render('products/pitchdeck');
});

router.get('/products/mvp-tech', function(req, res) {
        res.render('products/mvptech');
});

router.get('/products/version1-tech', function(req, res) {
        res.render('products/version1tech');
});



module.exports = router;