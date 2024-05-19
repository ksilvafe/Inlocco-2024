import { Router } from "express";

import { ensureAuthenticated } from "../../shared/infra/middlwares/ensureAuthenticated";
import { LocationController } from "../controllers/LocationController";

const locationController = new LocationController();

const locationsRouter = Router();
locationsRouter.get(
  "/reverse",
  ensureAuthenticated,
  locationController.reverse
);
locationsRouter.get("/search", ensureAuthenticated, locationController.search);

export { locationsRouter };
