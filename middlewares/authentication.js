const {User} = require("../models");
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
            role: user.role
        }

        // console.log(req.user)
        next();

    } catch (error) {
        next(error);
    }
}

module.exports = authentication