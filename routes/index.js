const CategoryController = require('../controllers/CategoryController');
const CuisineController = require('../controllers/CuisineController');
const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');
const {cuisineAuthorization, adminOnlyAuth} = require('../middlewares/authorization');
const errorHandler = require('../middlewares/errorHandler');

const multer  = require('multer'); //dari app /router ?
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = require('express').Router();  



router.get("/pub/cuisines", CuisineController.getCuisines); //all

router.get("/pub/cuisines/:id", CuisineController.getCuisine);  //by id


// USER

router.post("/login", UserController.login); //login

router.use(authentication);

router.post("/add-users", adminOnlyAuth, UserController.registerUser);   //register


// CATEGORIES

router.get("/categories", CategoryController.getCategories);

router.post("/categories", CategoryController.createCategory);  

router.put("/categories/:id", CategoryController.editCategory);  

router.delete("/categories/:id", CategoryController.deleteCategory); 


// CUISINE

router.get("/cuisines", CuisineController.getCuisines); 

router.get("/cuisines/:id", CuisineController.getCuisine); 

router.post("/cuisines", CuisineController.createCuisine); 

router.put("/cuisines/:id", cuisineAuthorization, CuisineController.editCuisine);  

router.delete("/cuisines/:id", cuisineAuthorization, CuisineController.deleteCuisine); 


// UPDATE imgUrl

router.patch("/cuisines/:id/image-url", upload.single('image'), cuisineAuthorization, CuisineController.updateImageUrl) //adminOnlyAuth,


// ERROR HANDLER

router.use(errorHandler);



module.exports = router;