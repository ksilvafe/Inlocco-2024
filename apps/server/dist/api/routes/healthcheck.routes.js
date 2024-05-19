"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthcheckRouter = void 0;
const express_1 = require("express");
const healthcheckRouter = (0, express_1.Router)();
exports.healthcheckRouter = healthcheckRouter;
healthcheckRouter.get("/", (req, res) => res.send());
//# sourceMappingURL=healthcheck.routes.js.map