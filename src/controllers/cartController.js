var cartController = {};
var cartModel = require('../models/cartModel').dataModel;
var userModel = require('../models/userModel').dataModel;
var cartValidator = require('../validators/cartValidator');
var appHelper = require('../helpers/appHelper');

cartController.create = function (req, res) {
    var cartInfo = req.body;

    cartInfo.creationDate = appHelper.utcTimestamp();
    cartInfo.lastUpdateDate = appHelper.utcTimestamp();

    if (!cartValidator.validateRequest(cartInfo)) {
        return res.send({
            status: false,
            message: 'failed'
        });
    }

    var cartObject = new cartModel(cartInfo);
    cartObject.save(callback = function (error, data) {
        if (error) {
            return res.send({
                status: false,
                message: 'failed : ' + error.message
            });
        }

        return res.send({
            status: true,
            message: 'success'
        });
    });

}

cartController.retrive = function (req, res) {
    var userid = parseInt(req.params.userid);

    cartModel.find({'userId':userid},["userId","productId","productName","vendorCode","vendorName","productSize","productQuantity","productNetPrice","productUnitPrice","cartId","productImage"], function(err,data){
        if(err){
            return res.send({
                'status': false,
                'message': 'failed to retrive user cart.'
            });
        }
        
        return res.send({
            'status': true,
            'message': 'success.',
            'data': data
        });

    });

    // return res.send({'userid':userid});
    // userModel.aggregate([
    //     { 
    //         $lookup:{
    //                 from: 'rdcarts',
    //                 localField: 'userId',
    //                 foreignField: 'userId',
    //                 as: 'usercart'
    //             }
    //     },
    //     { 
    //         $match: {
    //                 "userId":userid
    //             } 
    //     }
    // ]).exec(function(err, results){
    //     return res.send(results);
    //  });   
    
}

cartController.update = function (req, res) {
    return res.send();
}

cartController.delete = function (req, res) {
    return res.send();
}

module.exports = cartController;