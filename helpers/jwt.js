const jwt = require('jsonwebtoken');

const secret = process.env.secret;

const signToken = (payload) => {
    return jwt.sign(payload, secret);
}

const verifyToken = (token) => {
    return jwt.verify(token, secret);
}


module.exports = {signToken, verifyToken};


// const token = signToken({tralala: 'huha'});
// const decoded = verifyToken(token);
// console.log(token)
// console.log(decoded)