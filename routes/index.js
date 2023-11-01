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


// USER


router.post("/login", UserController.login); //login

router.use(authentication);

router.post("/add-users", adminOnlyAuth, UserController.registerUser);   //register


// CATEGORIES

router.get("/categories", CategoryController.getCategories); //7

router.post("/categories", CategoryController.createCategory);    //6

router.put("/categories/:id", CategoryController.editCategory);  //8

router.delete("/categories/:id", CategoryController.deleteCategory); //9


// CUISINE

router.get("/cuisines", CuisineController.getCuisines); //all

router.get("/cuisines/:id", CuisineController.getCuisine);  //by id

router.post("/cuisines", CuisineController.createCuisine);  //create

router.put("/cuisines/:id", cuisineAuthorization, CuisineController.editCuisine);  //edit

router.delete("/cuisines/:id", cuisineAuthorization, CuisineController.deleteCuisine); 


// UPDATE imgUrl

router.patch("/cuisines/:id/image-url", upload.single('image'), cuisineAuthorization, CuisineController.updateImageUrl) //adminOnlyAuth,

router.use(errorHandler);



module.exports = router;