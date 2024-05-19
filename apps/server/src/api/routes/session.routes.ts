import { Router } from "express";

import { SessionController } from "../controllers/SessionController";

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.get("/auth", sessionController.authenticate);
sessionRouter.post("/auth/confirm", sessionController.requestUserVerification);
sessionRouter.get(
  "/auth/confirm/:confirmationCode",
  sessionController.verifyUser
);

sessionRouter.post(
  "/auth/recoveryPassword",
  sessionController.requestUserPasswordRecovery
);
sessionRouter.patch(
  "/auth/recoveryPassword",
  sessionController.recoverUserPassword
);

export { sessionRouter };
