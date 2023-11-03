const CategoryController = require('../controllers/CategoryController');
const authentication = require('../middlewares/authentication');
const {adminOnlyAuth} = require('../middlewares/authorization');
const errorHandler = require('../middlewares/errorHandler');


const router = require('express').Router();  


router.use(authentication); // token


// CATEGORIES

router.get("/categories", CategoryController.getCategories);

router.post("/categories", CategoryController.createCategory);  

router.put("/categories/:id", adminOnlyAuth, CategoryController.editCategory);  
 

// ERROR HANDLER

router.use(errorHandler);



module.exports = router;