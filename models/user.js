var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_FACTOR = 10;

//Creating a user model and properties
var usermodel = {        
        username: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        createdAt:
        {
            type: Date,
            default: Date.now
        },        
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
var userSchema = new mongoose.Schema(usermodel);

//A do-nothing function for use with the bcrypt module
var noop = function () { };

//define a pre-save action
userSchema.pre("save", function (done) {
    var user = this;
    //Skips this logic if password isn’t modified
    if (!user.isModified('password')) {
        return done();
    }
    //Generates a salt for the hash, and calls the inner function once completed
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err);
        }
        //Hashes the user’s password         
        bcrypt.hash(user.password, salt, noop, function (err, hashedPassword) {
            if (err) {
                return done(err);
            }
            //Stores the password
            user.password = hashedPassword;
            console.log('Password modify!!')
            //continues with the saving
            done();
        });
    });
});

/*****
defines instance methods
******/

//display name
userSchema.methods.name = function (cb) {
    //console.log('This is user instace ' + this.displayName);
    //console.log('-------------------------------');
    return this.displayName || this.username;
};

userSchema.methods.checkPassword=function(guess, done){
    bcrypt.compare(guess, this.password, function(err, isMatch){
        done(err, isMatch);
    });
};

/*****
defines static methods
******/

userSchema.statics.list = function (cb) { 
    this.find()
        .sort({createdAt: "descending"})
        .exec(function(err, users){
            cb(err, users);
        });
};


userSchema.statics.findOneByName = function(name, cb){
    this.findOne({username:name}, function(err, user){
        cb(err, user);
    });
};

/*****
Add query helper functions
******/
userSchema.query.byName = function (name) {
    return this.find({name: ReqExp(name, "i") });
};

//defining user model and make sure to export
var User = mongoose.model('User', userSchema);


module.exports = User;

