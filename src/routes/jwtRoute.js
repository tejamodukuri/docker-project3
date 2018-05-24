var express = require('express');
var jwtRouter = express.Router();
var jwtAuthController = require('../controllers/jwtAuthController');

jwtRouter.post('/issuetoken', function(req, res, next) {
    jwtAuthController.generateToken(req,res);
});

jwtRouter.post('/verifytoken', function(req, res, next) {
    jwtAuthController.verifyToken(req,res);
});

module.exports = jwtRouter;