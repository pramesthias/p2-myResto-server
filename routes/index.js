const CategoryController = require('../controllers/CategoryController');
const CuisineController = require('../controllers/CuisineController');
const UserController = require('../controllers/UserController');

const router = require('express').Router();  


// USER

router.get("/users", UserController.getUsers); //all

router.post("/add-users", UserController.createUser);


// CATEGORIES

router.get("/categories", CategoryController.getCategories); //7

router.post("/categories", CategoryController.createCategory);    //6

router.put("/categories/:id", CategoryController.editCategory);  //8

router.delete("/categories/:id", CategoryController.deleteCategory); //9



// CUISINE

router.get("/cuisines", CuisineController.getCuisines); //all

router.get("/cuisines/:id", CuisineController.getCuisine);  //by id

router.post("/cuisines", CuisineController.createCuisine);

router.put("/cuisines/:id", CuisineController.editCuisine);  //edit

router.delete("/cuisines/:id", CuisineController.deleteCuisine); 



module.exports = router;