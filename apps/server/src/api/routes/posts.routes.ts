import { Router } from "express";

import { ensureAuthenticated } from "../../shared/infra/middlwares/ensureAuthenticated";
import { upload } from "../../shared/infra/middlwares/upload";
import { PostController } from "../controllers/PostController";

const postController = new PostController();

const postsRouter = Router();
postsRouter.post(
  "/",
  ensureAuthenticated,
  upload.array("photos"),
  // upload.array("videos"),
  postController.store
);
postsRouter.put("/:cuid", ensureAuthenticated, postController.update);
postsRouter.get("/:cuid", ensureAuthenticated, postController.show);
postsRouter.get("/", ensureAuthenticated, postController.index);
postsRouter.patch("/:cuid/save", ensureAuthenticated, postController.save);

export { postsRouter };
