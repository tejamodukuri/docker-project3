var jwt = require("jsonwebtoken");
var fs = require('fs');
var jwtConfig = fs.readFileSync('appConfig.json', 'utf8');
var jwtConfigObject = JSON.parse(jwtConfig).jwtAuth;
var jwtController = {};

jwtController.issueToken = function (ID) {
    var token = jwt.sign({ id: ID }, jwtConfigObject.secret, {
        expiresIn: jwtConfigObject.expiry
    });
    return token;
}

jwtController.authenticateToken = function (token) {
    var returnFlag = true;
    jwt.verify(token, jwtConfigObject.secret, function (err, decoded) {
        if (err) {
            returnFlag = false;
        }
        else{
            returnFlag = true;
        }
    });
    return returnFlag;
}



jwtController.generateToken = function (req, res) {
    if (typeof req.body.id == "undefined") {
        return res.send({
            auth: false
        });
    }

    if (token = jwtController.issueToken(req.body.id)) {
        return res.send({
            auth: true,
            token: token
        });
    }

    return res.send({
        auth: false
    });
}

jwtController.verifyToken = function (req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    if (jwtController.authenticateToken(token)) {
        return res.status(200).send({ status: true });
    }

    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
}

module.exports = jwtController;