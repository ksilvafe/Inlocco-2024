import { Router } from "express";

import { ensureAuthenticated } from "../../shared/infra/middlwares/ensureAuthenticated";
import { CommentController } from "../controllers/CommentController";

const commentController = new CommentController();

const commentsRouter = Router();
commentsRouter.post("/:cuid", ensureAuthenticated, commentController.store);

export { commentsRouter };
