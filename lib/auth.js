const JWT = require("jsonwebtoken");

const SECRET = '@Rohan@vyas@76778';

const generateToken = function(user){
    const payload = JSON.stringify(user);
    const token = JWT.sign(payload,SECRET);
    return token;
}

const validateToken = function(token){
    const data = JWT.verify(token,SECRET);
    return data;
}

module.exports = {
    generateToken,
    validateToken,
}