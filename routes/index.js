const CategoryController = require('../controllers/CategoryController');
const CuisineController = require('../controllers/CuisineController');
const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');
// const cuisineAuthorization = require('../middlewares/authorization');
// const errorHandler = require('../middlewares/errorHandler');

const router = require('express').Router();  


// USER

router.post("/add-users", UserController.registerUser);   //register

router.post("/login", UserController.login); //login


// CATEGORIES

router.get("/categories", CategoryController.getCategories); //7

router.post("/categories", CategoryController.createCategory);    //6

router.put("/categories/:id", CategoryController.editCategory);  //8

router.delete("/categories/:id", CategoryController.deleteCategory); //9


router.use(authentication);

// CUISINE

router.get("/cuisines", CuisineController.getCuisines); //all

router.get("/cuisines/:id", CuisineController.getCuisine);  //by id

router.post("/cuisines", CuisineController.createCuisine);  //create

router.put("/cuisines/:id", CuisineController.editCuisine);  //edit

router.delete("/cuisines/:id", CuisineController.deleteCuisine); 

// router.use(errorHandler);




module.exports = router;