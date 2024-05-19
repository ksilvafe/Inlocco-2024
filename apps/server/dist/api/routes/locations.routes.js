"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationsRouter = void 0;
const express_1 = require("express");
const ensureAuthenticated_1 = require("../../shared/infra/middlwares/ensureAuthenticated");
const LocationController_1 = require("../controllers/LocationController");
const locationController = new LocationController_1.LocationController();
const locationsRouter = (0, express_1.Router)();
exports.locationsRouter = locationsRouter;
locationsRouter.get("/reverse", ensureAuthenticated_1.ensureAuthenticated, locationController.reverse);
locationsRouter.get("/search", ensureAuthenticated_1.ensureAuthenticated, locationController.search);
//# sourceMappingURL=locations.routes.js.map