const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// this makes a new schema for a collection
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'A name is required.' ],
        minlength: [ 1, 'Name must be between 1 and 99 characters.' ],
        maxlength: [ 99, 'Name must be between 1 and 99 characters.' ]
    },
    email: {
        type: String,
        required: [ true, 'Please enter an email address.' ],
        minlength: [ 1, 'Name must be between 1 and 99 characters.' ],
        maxlength: [ 99, 'Name must be between 1 and 99 characters.' ]
    },
    password: {
        type: String,
        required: [ true, 'A password is required.' ],
        minlength: [ 8, 'Password must be between 8 and 99 characters.' ],
        maxlength: [ 99, 'Name must be between 8 and 99 characters.' ]
    },
    playlistIds: {
        type: Array
    }
});

// this returns user object without password
userSchema.set('toObject', {
    transform: function(doc, ret, options) {
        let returnJson = {
            _id: ret._id,
            email: ret.email,
            name: ret.name
        };
        return returnJson;
    }
});

// this checks to see if password matches what's in the db
userSchema.methods.authenticated = function(password, cb) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', function(next) {
  if (this.isNew) {
    let hash = bcrypt.hashSync(this.password, 12);
    this.password = hash;
  }
  next();
});

// make a new model from that Schema
const User = mongoose.model('User', userSchema);

module.exports = User;
