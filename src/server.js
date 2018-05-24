var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var inArray = require('in-array');

var jwtAuthController = require('./controllers/jwtAuthController.js');

var port = process.env.PORT || 7080;
var Schema = mongoose.Schema;

var url = 'mongodb://localhost/redemption';
mongoose.Promise = require('bluebird');
mongoose.connect(url);
var db = mongoose.connection;
var requestMethods = ['GET', 'PUT', 'POST', 'DELETE'];
var payloadMethods = ['PUT', 'POST', 'PATCH'];
db.on('error', console.error.bind(console, 'database connection error:'));
db.once('open', function () {
    console.log("Connected to database");
});


var indexRoute = require('./routes/indexRoute');
var productRoute = require('./routes/productRoute');
var userRoute = require('./routes/userRoute');
var jwtRoute = require('./routes/jwtRoute');
var cartRoute = require('./routes/cartRoute');

var app = express();
var cors = require('cors');


app.use(express.static(__dirname + '/'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    var resMessage = '';
    var nextFlag = true;

    if ((req.headers['content-type'] != 'application/json' && inArray(payloadMethods, req.method)) || !inArray(requestMethods, req.method)) {
        resMessage = 'Invalid Request';
        nextFlag = false;
    }

    if (req.url != '/jwt/issuetoken' && req.url != '/user/login') {
        var token = req.headers['x-access-token'];
        
        if (!token){
            resMessage = 'Invalid Request';
            nextFlag = false;
        }
        else if(jwtAuthController.authenticateToken(token)) {
            nextFlag = true;
        }
        else{
            resMessage = 'Unauthorized Access!';
            nextFlag = false;
        }
        
    }


    if(nextFlag || true){
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Max-Age", "3600");
        next();
    }
    else{
        return res.send({status:false,message:resMessage});
    }


});

app.use('/', indexRoute);
app.use('/product', productRoute);
app.use('/user', userRoute);
app.use('/jwt', jwtRoute);
app.use('/cart', cartRoute);

app.listen(port);
console.log('Magic happens on port ' + port);