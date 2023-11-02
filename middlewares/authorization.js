const {Cuisine} = require("../models");

async function cuisineAuthorization(req, res, next) {
    try {
        let cuisine = await Cuisine.findByPk(req.params.id);

        if(!cuisine) throw ({name: "NotFound"})

        // REVISED
        if(req.user.role !== "Admin" && cuisine.authorId !== req.user.id){
            throw {name: "Forbidden"}
        }

        next();

    } catch (error) {
        next(error);
    }
}

async function adminOnlyAuth(req, res, next){
    try {
        if(req.user.role === "Admin"){
            next();
        } else {
            throw {name: "Forbidden"};
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {cuisineAuthorization, adminOnlyAuth};