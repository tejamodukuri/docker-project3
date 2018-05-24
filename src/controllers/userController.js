var userController = {};
var userModel = require('../models/userModel').dataModel;
var userValidator = require('../validators/userValidator');
var appHelper = require('../helpers/appHelper');
var jwt = require('./jwtAuthController');

userController.createUser = function (req,res) {
    var userInfo = req.body;

    if(!userValidator.validateRequest(userInfo)){
        return res.send({
            status:false,
            message:'Invalid Request'
        });
    }

    userInfo.password = appHelper.generateUserPassword(userInfo.password);
    userInfo.creationDate = appHelper.utcTimestamp();
    userInfo.lastUpdateDate = appHelper.utcTimestamp();

    var userObject = new userModel(userInfo);
    userObject.save(callback = function(error,data){
        if(error){
            return res.send({
                status:false,
                message:'failed : '+ error.message
            });
        }
        
        return res.send({
            status:true,
            message:'success'
        });
    });
}

userController.updateUser = function (req, res) {
    var userInfo = req.body.data;
    var userId = req.body.userId
    userInfo.lastUpdateDate = appHelper.utcTimestamp();

    if (!userValidator.validateRequest(userInfo) || userId == "undefined") {
        return res.send({
            status: false,
            message: 'failed'
        });
    }

    userModel.findOneAndUpdate({ userId: userId }, userInfo, callback = function (error, data) {
        if (error) {
            return res.send({
                status: false,
                message: 'failed : ' + error.message
            });
        }

        return res.send({
            status: data != null ? true : false,
            message: data != null ? 'success' : 'failed to process update',
        });
    });

}

userController.fetchUser = function(req, res){
    var userId = req.params.userid;
    userModel.find({ 'userId': userId }, callback = function (error, data) {

        if (error) {
            return res.send({
                status: false,
                message: 'failed : ' + error.message
            });
        }

        return res.send({
            status: true,
            message: 'success',
            userInfo: data.length != 0 ? data[0] : {}
        });
    });
}

userController.login = function(req, res){
    var userInfo = req.body;

    if(!userValidator.validateRequest(userInfo)){
        return res.send({
            status:false,
            message:'Invalid Request'
        });
    }

    var inputPassword = userInfo.password;
    
    userModel.find({ emailAddress: userInfo.emailAddress }, callback = function (error, data) {
        if (error) {
            return res.send({
                status: false,
                message: 'failed : ' + error.message
            });
        }

        if(data.length > 0 && appHelper.verifyUserPassword(inputPassword, data[0].password)){

            return res.send({
                status: true,
                message: 'login success',
                token: jwt.issueToken(data[0].userId),
                userId: data[0].userId
            });
        }
        else{
            return res.send({
                status: false,
                message: 'failed : Invalid username or password'
            });
        }
        
    });    

}

module.exports = userController;