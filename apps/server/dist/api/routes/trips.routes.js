"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripsRouter = void 0;
const express_1 = require("express");
const ensureAuthenticated_1 = require("../../shared/infra/middlwares/ensureAuthenticated");
const TripController_1 = require("../controllers/TripController");
const tripController = new TripController_1.TripController();
const tripsRouter = (0, express_1.Router)();
exports.tripsRouter = tripsRouter;
tripsRouter.post("/", ensureAuthenticated_1.ensureAuthenticated, tripController.store);
tripsRouter.put("/:cuid", ensureAuthenticated_1.ensureAuthenticated, tripController.update);
tripsRouter.get("/:cuid", ensureAuthenticated_1.ensureAuthenticated, tripController.show);
tripsRouter.get("/", ensureAuthenticated_1.ensureAuthenticated, tripController.index);
tripsRouter.patch("/:cuid/like", ensureAuthenticated_1.ensureAuthenticated, tripController.like);
tripsRouter.patch("/:cuid/share", ensureAuthenticated_1.ensureAuthenticated, tripController.share);
tripsRouter.patch("/:cuid/save", ensureAuthenticated_1.ensureAuthenticated, tripController.save);
//# sourceMappingURL=trips.routes.js.map