var bcrypt = require('bcryptjs');
var appHelper = {};
appHelper.dateTime = require('node-datetime');
appHelper.randomize = require('randomatic');

appHelper.generateUserPassword = function(password){
    var hashedPassword = bcrypt.hashSync(password, 8);
    return hashedPassword;
}

appHelper.verifyUserPassword = function(password, hashedPassword){
    if(bcrypt.compareSync(password, hashedPassword)) {
        // Passwords mached
        return true;
    } else {
        // Passwords don't match
        return false;
    }
}

appHelper.validRequestParams = function(dataArray,inputObject){
    var valid = true;
    for (var objKey in inputObject) {
        if(!inArray(dataArray, objKey)){
            valid = false;
        }
        if(!valid){
            return false;
        }
    }
    return valid;
}


appHelper.getCurrentTimeInMs = function(){
    var timeInMs = new Date().getTime();
    return timeInMs;
}

/** dd-mm-yyyy hh:mm:ss */
appHelper.getDateTimeInRegularFormat = function(){
    var dt = AppHelper.dateTime.create();
    var formatted_datetime = dt.format('d-m-Y H:M:S');
    return formatted_datetime;
}

/* yyyy-mm-dd hh:mm:ss */
appHelper.getDateTimeInStorageFormat = function(){
    var dt = AppHelper.dateTime.create();
    var formatted_datetime = dt.format('Y-m-d H:M:S');
    return formatted_datetime;
}

appHelper.utcTimestamp  = function(){
    var localDate = new Date();
    var moment = require('moment');
    var localMoment = moment();
    var utcMoment = moment.utc();
    var utcDate = new Date( utcMoment.format() );
    return utcDate;
}

/** ISO => dd-mm-yyyy hh:mm:ss */
appHelper.dateIsoToRegular = function($inputIsoDate){
    var moment = require('moment');
    var output = moment.utc($inputIsoDate).utcOffset(330).format('DD-MMM-YYYY HH:mm:ss'); // 'DD ddd HH:mm'
    return output;
}

appHelper.generateRandomALNUM = function(length){
    var alnum = '';
    alnum = AppHelper.randomize('A0',length);
    return alnum;
}

appHelper.generateRandomNum = function(length){
    var num;
    num = AppHelper.randomize('0',length);
    return num;
}


module.exports = appHelper;