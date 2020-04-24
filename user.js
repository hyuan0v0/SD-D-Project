const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

// create user schema
const UserSchema = new Schema({
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
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  groups: {
    type: String,
    required: false,
  },
});
// method to hash the password before saving it to the database
UserSchema.pre('save', function hashPassword(next) {
  console.log(this);
  const user = this;
  console.log(user.password);
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return err;
    }
    user.password = hash;
    return next();
  });
});

// a method to authenticate the user
UserSchema.statics.authenticate = (User, email, password, callback) => {
  User.findOne({ email })
    .exec((err, user) => {
      if (err) {
        return callback(err);
      } if (!user) {
        const error = new Error('User not found.');
        error.status = 401;
        return callback(error);
      }
      return bcrypt.compare(password, user.password, (err2, result) => {
        if (result === true) {
          return callback(null, user);
        }
        const error = new Error('Incorrect password.');
        return callback(error);
      });
    });
};

// export user model
module.exports = mongoose.model('User', UserSchema);