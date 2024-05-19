import { Router } from "express";

import { ensureAuthenticated } from "../../shared/infra/middlwares/ensureAuthenticated";
import { FollowController } from "../controllers/FollowController";

const followController = new FollowController();

const followsRouter = Router();
followsRouter.post("/", ensureAuthenticated, followController.store);
followsRouter.get(
  "/:cuid/followers",
  ensureAuthenticated,
  followController.followers
);
followsRouter.get(
  "/:cuid/following",
  ensureAuthenticated,
  followController.following
);

export { followsRouter };
