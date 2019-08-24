const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('../config');

const UserSchema = new Schema({
    id: String,
    email: { type: String },
    password: {type: String},
    token: {
        type: [
            {
                id: String,
                token: String
            }
        ],
    },
});

UserSchema.methods.comparePassword = function (password, callback) {
    return bcrypt.compare(password, this.password, callback);
};

UserSchema.methods.generateToken = (id, user_id, callback) => {
    const claim = {
        id,
        user_id
    };
    const cert = fs.readFileSync(config.root + 'config/private.pem');
    jwt.sign(claim, cert, { algorithm: 'RS256' }, callback);
};

module.exports = mongoose.model('User', UserSchema);
