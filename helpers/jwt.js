const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const signToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET);
}

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}


module.exports = {signToken, verifyToken};


// const token = signToken({tralala: 'huha'});
// const decoded = verifyToken(token);
// console.log(token)
// console.log(decoded)