'use strict'

var mongoose= require("mongoose");

//Creating a menu model and properties
var menu = {
        dishName: {
            type: String,
            require: true            
        }, 
        cookTime: Number,      
        createdAt:
        {
            type: Date,
            default: Date.now
        },
        region: String,
        Instructions:[String],
        comments: [{body: String, date:{type:Date, default: Date.now}}],
        seasonings: [{description: String, quantity:String}],
        ingredients: [{description: String, quantity: String}],
        mainIngredients: [{description: String, quantity: String}],          
        pics: [{file: String, url: String}],
        creator :String 
};

var menuSchema = new mongoose.Schema(menu);

//Defines instance methods
menuSchema.methods.findSimilarRegion=function(cb){
    return this.model("Menu").find({region: this.region}, cb);
};

//Defines statics methods
menuSchema.statics.findByName= function(name, cb){
    return this.find({dishName: new RegExp(name, 'i')}, cb);
};

//Defines query
menuSchema.query.byName =function(name){
    return this.find({dishName: new RegExp(name, "i")});
};

//Defines index
menuSchema.index();

//Defines virtual
menuSchema.virtual('fullName')
          .get(function(){return this.name.first +' '+this.name.last;})
          .set(function(v){
              this.name.first = v.substr(0, v.indexOf(' '));
              this.name.last = v.substr(v.indexOf(' ')+1);
          });

var Menu = mongoose.model("Menu", menuSchema)

module.exports= Menu;
