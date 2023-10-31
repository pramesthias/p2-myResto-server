// const Cuisine = require("../models");

// async function cuisineAuthorization(req, res, next) {
//     try {
//         let cuisine = await Cuisine.findByPk(req.params.id);

//         if(!cuisine) throw ({name: "NotFound"})

//         if(cuisine.authorId !== req.user.id){
//             throw {name: "Forbidden"}
//         }

//         next();
//     } catch (error) {
//         next(error);

        // if(error.name === "Forbidden"){
        //     res.status(403).json({message: "You are not authorized"});
        // } else if (error.name === "NotFound") {
        //     res.status(404).json({message: "Cuisine not found"});
        // } else {
        //     res.status(500).json({message: "Internal Server Error"});
        // }
//     }
// }

// module.exports = cuisineAuthorization