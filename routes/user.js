var express = require('express');
//var passport = require('passport');



var router = express.Router();

//Sets useful variables for your templates
router.use(controller.localVarials);

/* GET home page. */
//Queries the users collection, returning the newest users first
router.get('/', controller.listUsers);

router.get("/signup", controller.signup);

router.get("/login", controller.login);

router.get("/logout", controller.logout);

router.get("/edit", controller.ensureAuthenticated, controller.edit);

router.get('/users/:username', controller.findUserByUsername);

router.post("/signup", controller.createUser, controller.authenticateSignup);
 
router.post("/login", controller.authenticateLogin);

// 通常，这会是一个PUT请求，不过HTML表单仅仅支持GET和POST
router.post("/edit", controller.ensureAuthenticated, controller.editUser);    

module.exports = router;