const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    picture: String,
    locale: String
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = {
    UserModel,
};