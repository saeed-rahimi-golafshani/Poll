const { Schema, model } = require("mongoose");


const UserSchema = new Schema({
    firstname: {type: String},
    lastname: {type: String},
    username: {type: String},
    mobile: {type: String, required: true, unique: true},
    email: {type: String, unique: true},
    active: {type: Boolean},
    birthday: {type: String},
    createdAt: {type: String},
    updatedAt: {type: String},
    gender: {type: String},
    rate: {type: Number},
    access_profile: {type: Boolean, default: true},
    Phone_verification: {type: Boolean, default: false},
    email_verification: {type: Boolean, default: false}
});

module.exports = {
    UserModel: model("user", UserSchema)
}