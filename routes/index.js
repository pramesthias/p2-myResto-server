const CategoryController = require('../controllers/CategoryController');
const CuisineController = require('../controllers/CuisineController');
const UserController = require('../controllers/UserController');
const { verifyToken } = require('../helpers/jwt');

const router = require('express').Router();  


// USER

router.post("/add-users", UserController.registerUser);   //register

router.post("/login", UserController.login); //login


// CATEGORIES

router.get("/categories", CategoryController.getCategories); //7

router.post("/categories", CategoryController.createCategory);    //6

router.put("/categories/:id", CategoryController.editCategory);  //8

router.delete("/categories/:id", CategoryController.deleteCategory); //9


// CUISINE

router.get("/cuisines", CuisineController.getCuisines); //all

router.get("/cuisines/:id", CuisineController.getCuisine);  //by id

router.post("/cuisines", CuisineController.createCuisine);  //create

router.put("/cuisines/:id", CuisineController.editCuisine);  //edit

router.delete("/cuisines/:id", CuisineController.deleteCuisine); 




const {User, Category, Cuisine} = require("../models");

async function authenticaion(req, res, next){
    try {
        let access_token = req.headers.authorization

        if(!access_token) throw {name: "Unauthenticated"}

        let { id } = verifyToken(access_token.replace("Bearer ", ""))

        let user = await User.findByPk(id)

        if(!user) throw {name: "Unauthenticated"}

        req.user = {
            id: user.id,
            email: user.email
        }

        next();

    } catch (error) {
        if(error.name === "JsonWebTokenError" || error.name === "Unauthenticated"){
            res.status(401).json({message: "Unauthenticated"});
        } else {
            res.status(500).json({message: "Internal Server Error"});
        }
    }
}



async function cuisineAuthorization(req, res, next) {
    try {
        let cuisine = await Cuisine.findByPk(req.params.id);

        if(!cuisine) throw ({name: "NotFound"})

        if(cuisine.authorId !== req.user.id){
            throw {name: "Forbidden"}
        }

        next();
    } catch (error) {
        if(error.name === "Forbidden"){
            res.status(403).json({message: "You are not authorized"});
        } else if (error.name === "NotFound") {
            res.status(404).json({message: "Cuisine not found"});
        } else {
            res.status(500).json({message: "Internal Server Error"});
        }
    }
}






module.exports = router;