import { Router } from "express";

import { ensureAuthenticated } from "../../shared/infra/middlwares/ensureAuthenticated";
import { TripController } from "../controllers/TripController";

const tripController = new TripController();

const tripsRouter = Router();
tripsRouter.post("/", ensureAuthenticated, tripController.store);
tripsRouter.put("/:cuid", ensureAuthenticated, tripController.update);
tripsRouter.get("/:cuid", ensureAuthenticated, tripController.show);
tripsRouter.get("/", ensureAuthenticated, tripController.index);
tripsRouter.patch("/:cuid/like", ensureAuthenticated, tripController.like);
tripsRouter.patch("/:cuid/share", ensureAuthenticated, tripController.share);
tripsRouter.patch("/:cuid/save", ensureAuthenticated, tripController.save);

export { tripsRouter };
