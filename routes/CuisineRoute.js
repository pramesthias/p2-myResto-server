const CuisineController = require('../controllers/CuisineController');
const authentication = require('../middlewares/authentication');
const {cuisineAuthorization} = require('../middlewares/authorization');
const errorHandler = require('../middlewares/errorHandler');

const multer  = require('multer'); //dari app /router ?
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = require('express').Router();  


router.get("/pub/cuisines", CuisineController.getPubCuisines); //all

router.get("/pub/cuisines/:id", CuisineController.getCuisine);  //by id


router.use(authentication); // token

router.get("/cuisines", CuisineController.getCuisines); 

router.get("/cuisines/:id", CuisineController.getCuisine); 

router.post("/cuisines", CuisineController.createCuisine); 

router.put("/cuisines/:id", cuisineAuthorization, CuisineController.editCuisine);  

router.delete("/cuisines/:id", cuisineAuthorization, CuisineController.deleteCuisine); 


// UPDATE imgUrl

router.patch("/cuisines/:id/image-url", upload.single('image'), cuisineAuthorization, CuisineController.updateImageUrl)


// ERROR HANDLER

router.use(errorHandler);



module.exports = router;