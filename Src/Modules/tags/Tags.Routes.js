const { Router } = require("express");
const TagsController = require("./Tags.Controller");

const router = Router();
router.post("/", TagsController.createTags);

module.exports = {
    TagsRoutes: router
}