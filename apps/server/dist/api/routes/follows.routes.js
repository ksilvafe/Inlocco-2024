"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followsRouter = void 0;
const express_1 = require("express");
const ensureAuthenticated_1 = require("../../shared/infra/middlwares/ensureAuthenticated");
const FollowController_1 = require("../controllers/FollowController");
const followController = new FollowController_1.FollowController();
const followsRouter = (0, express_1.Router)();
exports.followsRouter = followsRouter;
followsRouter.post("/", ensureAuthenticated_1.ensureAuthenticated, followController.store);
followsRouter.get("/:cuid/followers", ensureAuthenticated_1.ensureAuthenticated, followController.followers);
followsRouter.get("/:cuid/following", ensureAuthenticated_1.ensureAuthenticated, followController.following);
//# sourceMappingURL=follows.routes.js.map