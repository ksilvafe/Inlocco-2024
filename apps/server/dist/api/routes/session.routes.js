"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRouter = void 0;
const express_1 = require("express");
const SessionController_1 = require("../controllers/SessionController");
const sessionRouter = (0, express_1.Router)();
exports.sessionRouter = sessionRouter;
const sessionController = new SessionController_1.SessionController();
sessionRouter.get("/auth", sessionController.authenticate);
sessionRouter.post("/auth/confirm", sessionController.requestUserVerification);
sessionRouter.get("/auth/confirm/:confirmationCode", sessionController.verifyUser);
sessionRouter.post("/auth/recoveryPassword", sessionController.requestUserPasswordRecovery);
sessionRouter.patch("/auth/recoveryPassword", sessionController.recoverUserPassword);
//# sourceMappingURL=session.routes.js.map