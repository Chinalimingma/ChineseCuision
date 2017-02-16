var mongoose = require('mongoose');
var dbURI = "mongodb://localhost/cuision";

mongoose.Promise = global.Promise; 
//Connects to your MongoDB server in the test database
var db = mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

/* ********************************************
USER SCHEMA
******************************************** */
//Creating a user model and properties
var userModel = {        
        name: String,
        createdOn:
        {
            type: Date,
            default: Date.now
        },
        ModifiedOn:Date,
        lastLogin: Date,

        bio: String,        
        phone: {description: String,
            phone:String},        
        
        email: {description: String,
            email: String},              
        addresse: String,       
        facebook: String,
        twitter: String,
        github: String,
        avatar: {file: String,
            url: String},        
        menu: {type:mongoose.Schema.Types.ObjectId, ref:"menu"}        
};

//Defining the user schema
var userSchema = new mongoose.Schema(userModel);

var User = mongoose.model('User', userSchema);

/* ********************************************
PROJECT SCHEMA
******************************************** */
var projectSchema = new mongoose.Schema({
    projectName: String,
    createdOn: { type: Date, default: Date.now },
    modifiedOn: Date,
    createdBy: String,
    contributors: String,
    tasks: String
});
// Build the Project model
var Project = mongoose.model( 'Project', projectSchema );

module.exports = db;