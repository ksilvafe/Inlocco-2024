import { Router } from "express";

import { ensureAuthenticated } from "../../shared/infra/middlwares/ensureAuthenticated";
import { upload } from "../../shared/infra/middlwares/upload";
import { UserController } from "../controllers/UserController";

const userController = new UserController();

const usersRouter = Router();
usersRouter.post("/", userController.store);
usersRouter.get("/", ensureAuthenticated, userController.index);
usersRouter.get("/profile", ensureAuthenticated, userController.show);
usersRouter.get("/profile/:cuid", ensureAuthenticated, userController.show);
usersRouter.get(
  "/tripsSaved",
  ensureAuthenticated,
  userController.showTripsSaved
);

usersRouter.put(
  "/",
  ensureAuthenticated,
  upload.single("picture"),
  userController.update
);

export { usersRouter };
