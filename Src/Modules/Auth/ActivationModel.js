const { Schema, default: mongoose, model } = require("mongoose");

const OTPSchema = new Schema({
    code: {type: String, required: false, default: undefined},
    expiresIn: {type: Number, required: false, default: 0}
});
const ActivationSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId, required: true},
    otp: {type: OTPSchema},
    createdAt: {type: String},
    updatedAt: {type: String}
});

module.exports = {
    ActivationModel: model("activation", ActivationSchema)
};