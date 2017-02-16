var mongoose = require( 'mongoose' );
var Project = mongoose.model("Project");

module.exports = {
    create(req, res, next){},

    doCreate(req, res, next){},    

    displayInfo(req, res, next){},

    edit(req, res, next){},

    doEdit(req, res, next){},

    confirmDelete(req, res, next){},

    doDelete(req, res, next){ }
};