"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const ensureAuthenticated_1 = require("../../shared/infra/middlwares/ensureAuthenticated");
const upload_1 = require("../../shared/infra/middlwares/upload");
const UserController_1 = require("../controllers/UserController");
const userController = new UserController_1.UserController();
const usersRouter = (0, express_1.Router)();
exports.usersRouter = usersRouter;
usersRouter.post("/", userController.store);
usersRouter.get("/", ensureAuthenticated_1.ensureAuthenticated, userController.index);
usersRouter.get("/profile", ensureAuthenticated_1.ensureAuthenticated, userController.show);
usersRouter.get("/profile/:cuid", ensureAuthenticated_1.ensureAuthenticated, userController.show);
usersRouter.get("/tripsSaved", ensureAuthenticated_1.ensureAuthenticated, userController.showTripsSaved);
usersRouter.put("/", ensureAuthenticated_1.ensureAuthenticated, upload_1.upload.single("picture"), userController.update);
//# sourceMappingURL=users.routes.js.map