const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');
const {adminOnlyAuth} = require('../middlewares/authorization');
const errorHandler = require('../middlewares/errorHandler');


const router = require('express').Router();  


// USER

router.post("/login", UserController.login); //login

router.use(authentication); // token

router.post("/add-users", adminOnlyAuth, UserController.registerUser);   //register


// ERROR HANDLER

router.use(errorHandler);



module.exports = router;