import { Router } from "express";

import { commentsRouter } from "./comments.routes";
import { followsRouter } from "./follows.routes";
import { healthcheckRouter } from "./healthcheck.routes";
import { locationsRouter } from "./locations.routes";
import { notificationsRouter } from "./notifications.routes";
import { postsRouter } from "./posts.routes";
import { sessionRouter } from "./session.routes";
import { tripsRouter } from "./trips.routes";
import { usersRouter } from "./users.routes";

const router = Router();

router.use("/", sessionRouter);
router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use("/trips", tripsRouter);
router.use("/follows", followsRouter);
router.use("/comments", commentsRouter);
router.use("/locations", locationsRouter);
router.use("/healthcheck", healthcheckRouter);
router.use("/notifications", notificationsRouter);

export default router;
