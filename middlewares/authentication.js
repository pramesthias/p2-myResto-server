const User = require("../models");
const { verifyToken } = require('../helpers/jwt');


async function authentication(req, res, next){
    try {
        let access_token = req.headers.authorization

        if(!access_token) throw {name: "Unauthenticated"}

        const { id } = verifyToken(access_token.replace("Bearer ", ""))

        let user = await User.findByPk(id)

        if(!user) throw {name: "Unauthenticated"}

        req.user = {
            id: user.id,
            email: user.email
        }

        next();

    } catch (error) {
        next(error);

        // if(error.name === "JsonWebTokenError" || error.name === "Unauthenticated"){
        //     res.status(401).json({message: "Unauthenticated"});
        // } else {
        //     res.status(500).json({message: "Internal Server Error"});
        // }
    }
}

module.exports = authentication