const { Schema, model } = require("mongoose");

const TagsSchema = new Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true, index: true},
    content: {type: String},
    meta_title: {type: String}
}, {
    toJSON: {virtuals: true},
    versionKey: false
});

const TagsModel = model("tags", TagsSchema);
module.exports = TagsModel