var express = require('express');
var userRouter = express.Router();
var userController = require('../controllers/userController');
var userModel = require('../models/userModel');

userRouter.post('/create', function(req, res, next) {
    userController.createUser(req,res);
});

userRouter.patch('/update', function(req, res, next){
    userController.updateUser(req, res);
});

userRouter.get('/:userid', function(req, res, next){
    userController.fetchUser(req, res);
});

userRouter.post('/login', function(req, res, next){
    userController.login(req, res);
});


module.exports = userRouter;