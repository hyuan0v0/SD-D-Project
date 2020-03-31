const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

//create user schema
var UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    }
});

UserSchema.pre("save", function(next) {
    console.log(this);
    var user = this;
    console.log(user.password)
    bcrypt.hash(user.password,10,(err,hash)=>{
        if (err){
        console.log(err);
        return err;
        }
        user.password = hash;
        next();
    });
});

UserSchema.statics.authenticate = function (User, email, password, callback) {
    User.findOne({ email: email })
        .exec(function (err, user) {
        if (err) {
            return callback(err)
        } else if (!user) {
            var err = new Error('User not found.');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result === true) {
            return callback(null, user);
            } else {
            return callback();
            }
        })
    });
}

//export user model
module.exports = mongoose.model("User", UserSchema);
