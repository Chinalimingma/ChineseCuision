'use strict';

var fs = require("fs");
var path = require("path");
var _= require("lodash");
var crispy= require("crispy-string");
var passport = require('passport');

var mongoose = require( 'mongoose' );
var User = mongoose.model( 'User' );


var John = new User({    
    name: 'John Doe',
    lastLogin : Date.now(),
    bio:'This is John Doe biography',
    phone: {
        description: 'home',
        phone: '(333) 364 27364'
    },
       
    email: {
        description: 'personal',
        email: 'john.doe@example.com'
    }, 
    address: 'Cuarzo Street 2369',
    facebook: 'https://www.facebook.com/John.Doe',
    twitter: 'https://twitter.com/thejanedoe',
    github: 'https://github.com/abiee',
    avatar: {
        file:"cat.jpg",
        url: 'img/cat.jpg'
    }
});

John.save(function(err){
    if(!err){
        console.log("John saved");
    }
});

var Stephen = new User({
        name: 'Stephen Statler',
        bio: 'This is a Stephen Statler biography',
        email: {
            description: 'personal',
            email: 'jane.doe@example.com'
        },
        address: 'Tortilla Street 364',
        facebook: 'https://www.facebook.com/John.Doe',
        twitter: 'https://twitter.com/thejanedoe',
        
        avatar: {
            file: "cat3.jpg",
            url: 'img/cat3.jpg'
        }
});
Stephen.save(function(err){
    if(!err){
        console.log("Stephen saved");
    }
});

var Abiee = new User({
        name: 'Abiee Alejandro',
        bio: 'This is a Abiee Alejandro biography',
        email: {
            description: 'personal',
            email: 'abiee@echamea.com'
        },
        address: 'Cuarzo 2369',
        facebook: 'https://www.facebook.com/abiee.alejandro',
        twitter: 'https://twitter.com/AbieeAlejandro',
        github: 'https://github.com/abiee',
        avatar: {
            file: "cat4.jpg",
            url: 'img/cat4.jpg'
        }
});

Abiee.save(function(err){
    if(!err){
        console.log("Abiee saved");
    }
});

var Omare = new User({
    name: 'Omare',
    bio: 'This is a Omare biography',
    emails: 'me@omar-e.com',
    address: 'Del Árbol street',
    avatar: {
        file: "cat5.jpg",
        url: 'img/cat5.jpg'
    }
});

Omare.save(function(err){
    if(!err){
        console.log("Omare saved");
    }
});

function extractUserData(req){
    var result = {};
    var data = req.body;
    var fields = ['name','createdOn', 'ModifiedOn', 'lastLogin', 'bio','phone', 'email', 'addresse', 'facebook', 'twitter', 'google', 'github'];

    fields.forEach(field =>{
        if(data[field]){
            result[field]= data[field];
        }
    });
    return result;
}

module.exports ={
    authenticateSignup(){
        passport.authenticate("login", {
        successRedirect: "/",
        failureRedirect: "/signup",
        failureFlash: true
        })
    },
    authenticateLogin(){
        passport.authenticate("login", {
            successRedirect: "/",
            failureRedirect: "/login",
            // 如果用户登录失败则通过connect-flash设置错误信息
            failureFlash: true
        })
    },

    ensureAuthenticated(req, res, next) {
    // 一个Passport提供的函数
        if (req.isAuthenticated()) {
            next();
        } else {
            req.flash("info", "You must be logged in to see this page.");
            res.redirect("/login");
        }
    },
    index(req, res, next){},

    create(req, res, next){},

    doCreate(req, res, next){},

    edit(req, res, next){
        res.render('edit');
    },

    doedit(req, res, next){},

    confirmDelete(req, res, next){},

    doDelete(req, res, next){},

    login(req, res, next){
        res.render("login");
    },

    doLogin(req, res, next){},
    
    doLogout(req, res, next){
        res.redict('/');
    },
    
    listUsers(req, res, next){
        User.find()
            .sort({createdAt: "descending"})
            .exec(function(err, users){
                if(err){ return next(err); }
                res.render("user", {users: users});
            });
    },

    signup(req, res){
        res.render('signup');
    },

    
    _logout(req, res){
        req.logout();//Passport attaches req.user
        res.redict('/');
    },

    
    findUserByUsername(req, res, next){
        User.findOne({ username: req.params.username }, function(err, user){
            if(err){ return next(err);}
            if(!user){ return next(404);}
            res.render('profile', {user: user});
        });
    },

    createUser(req, res, next){
        var user = extractUserData(req);
        User.findOneByName(user.username, function(err, user){
        if(err){ return next(err);}
        if(usr){
            req.flash('error', "user already exists");
            return res.redirect("/signup");
            }
        
        var newUser = new User(user);
        newUser.save(next);
        });
    },
    
    authenticateLogin(){
        passport.authenticate("login", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: true //Set the error message with connect-flash
        });
    },

    editUser(req, res, next){
        var user= extractUserData(req);
        user.save(function(err){
            if(err){
                next(err);
                return;
            }
            req.flash("info", "Profile updated");
        res.redirect("/edit");
        });
    }
};

