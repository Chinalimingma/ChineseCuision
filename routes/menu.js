var express = require('express');
var router = express.Router();
var multer = require('multer');
var auth = require('../controller/oauth2Middleware');
var upload = multer();

//Routing is a way to map requests to specific handlers depending on 
//their URL and HTTP verb.
router.post('/oauth/token', auth.authenticate);

// Configure all available routes--create, get, update, and delete
router.post('/menus/',
    auth.requireAuthorization, function(req, res, next){

    });       //menu.save for a new Model
router.get('/',  function(req, res){
        res.render("menu");
        
    });        //menu.fetch
router.get('/:menuId',
    auth.requireAuthorization, function(req, res, next){
        
    });     //menu.fetch
router.put('/menus/:menuId',
    auth.requireAuthorization, function(req, res, next){
        
    });       //menu.save for an existing Model
router.delete('/menus/:menuId',
    auth.requireAuthorization, function(req, res, next){
        
    });       //menu.destroy

router.post('/menus/:menuId/avatar',
    auth.requireAuthorization,
    //Accept a single file with the name fieldname.
    // req.file is the `avatar` file 
    // req.body will hold the text fields, if there were any
    upload.single('avatar'),
    function(req, res, next){
        
    }
);

module.exports = router;