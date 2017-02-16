var express = require('express');
var router = express.Router();

var user = require("../controller/userController");
var project = require("../controller/projectController");

router.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

/* GET home page. */
//Queries the users collection, returning the newest users first
router.get('/', function(req, res){
    res.render("index");
});

router.get("/about", function(req, res){
    res.render("about");
});

// USER ROUTES
router.get('/user', user.index);                    // Current user profile
router.get('/user/new', user.create);               // Create new user form
router.post('/user/new', user.doCreate);            // Create new user action
router.get('/user/edit', user.edit);                // Edit current user form
router.post('/user/edit', user.doEdit);             // Edit current user action
router.get('/user/delete', user.confirmDelete);     // delete current

//user form
router.post('/user/delete', user.doDelete);         // Delete current

//user action
router.get('/login', user.login);                   // Login form
router.post('/login', user.doLogin);                // Login action
router.get('/logout', user.doLogout);               // Logout current user

// PROJECT ROUTES
router.get('/project/new', project.create);         // Create new project form

router.post('/project/new', project.doCreate);      // Create new project action

router.get('/project/:id', project.displayInfo);    // Display project info

router.get('/project/edit/:id', project.edit);      // Edit selected project form

router.post('/project/edit/:id', project.doEdit);   // Edit selected  project action

router.get('/project/delete/:id', project.confirmDelete);// Delete selected product form

router.post('/project/delete/:id', project.doDelete); // Delete selected project action

module.exports = routes;