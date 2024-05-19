"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRouter = void 0;
const express_1 = require("express");
const ensureAuthenticated_1 = require("../../shared/infra/middlwares/ensureAuthenticated");
const CommentController_1 = require("../controllers/CommentController");
const commentController = new CommentController_1.CommentController();
const commentsRouter = (0, express_1.Router)();
exports.commentsRouter = commentsRouter;
commentsRouter.post("/:cuid", ensureAuthenticated_1.ensureAuthenticated, commentController.store);
//# sourceMappingURL=comments.routes.js.map