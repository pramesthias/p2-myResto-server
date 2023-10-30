const CuisineController = require('../controllers/CuisineController');

const UserController = require('../controllers/UserController');

const router = require('express').Router();  


// USER

router.get("/users", UserController.getUsers); //all

router.get("/users/:id", UserController.getUser); //by id

router.post("/add-users", UserController.createUser);

router.put("/users/:id", UserController.editUser);  //edit

router.delete("/users/:id", UserController.deleteUser); 


// 


// CUISINE

// router.post("/cuisines", CuisineController.createCuisine);  //create

// router.get("/cuisines", CuisineController.getCuisines); //all

// router.get("/cuisines/:id", CuisineController.getCuisine); //by id


module.exports = router;