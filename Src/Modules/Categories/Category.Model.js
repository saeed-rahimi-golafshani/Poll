const { Schema, Types, model } = require("mongoose");

const CategorySchema = new Schema({
    title: {type: String, required: true},
    slug:  {type: String, required: true, index: true},
    icon: {type: String},
    showInArchive: {type: Boolean, default: false},
    createdAt: {type: String},
    updatedAt: {type: String},
    parent: {type: Types.ObjectId, ref: "category", required: false},
    parents: {type: [Types.ObjectId], ref: "category", required: false}
}, {
    versionKey: false,
    id: false,
    toJSON: {virtuals: true}
});
CategorySchema.virtual("children", {
    ref: "category",
    localField: "_id",
    foreignField: "parent"
});
function autoPopulate(next){
    this.populate([{path: "children"}]);
    next();
}
CategorySchema.pre("find", autoPopulate).pre("findOne", autoPopulate);

const CategoryModel = model("category", CategorySchema);
module.exports = CategoryModel