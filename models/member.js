'use strict'

var mongoose = require('mongoose');

//Creating a user model and properties
var membermodel = {
        name: {
            type: String,
            require: true,            
        },        
        createdAt:
        {
            type: Date,
            default: Date.now
        },        
        bio: String,        
        phones: [{description: String,
            phone:String}],        
        emails: [{description: String,
            email: String}],        
        addresse: [String],       
        facebook: String,
        twitter: String,
        github: String,
        avatar: {file: String,
            url: String}, 
        menu: {type:mongoose.Schema.Types.ObjectId, ref:"menu"}       
};

//Defining the user schema
var memberSchema = new mongoose.Schema(membermodel);

//Defines instance methods
//Defines statics methods
//Defines query
//Defines index
//Defines virtual

var Mumber = mongoose.model("Mumber", memberSchema);

module.exports = Mumber;