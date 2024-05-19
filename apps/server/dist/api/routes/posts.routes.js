"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const ensureAuthenticated_1 = require("../../shared/infra/middlwares/ensureAuthenticated");
const upload_1 = require("../../shared/infra/middlwares/upload");
const PostController_1 = require("../controllers/PostController");
const postController = new PostController_1.PostController();
const postsRouter = (0, express_1.Router)();
exports.postsRouter = postsRouter;
postsRouter.post("/", ensureAuthenticated_1.ensureAuthenticated, upload_1.upload.array("photos"), 
// upload.array("videos"),
postController.store);
postsRouter.put("/:cuid", ensureAuthenticated_1.ensureAuthenticated, postController.update);
postsRouter.get("/:cuid", ensureAuthenticated_1.ensureAuthenticated, postController.show);
postsRouter.get("/", ensureAuthenticated_1.ensureAuthenticated, postController.index);
postsRouter.patch("/:cuid/save", ensureAuthenticated_1.ensureAuthenticated, postController.save);
//# sourceMappingURL=posts.routes.js.map