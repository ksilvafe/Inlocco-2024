import { Router } from "express";

const healthcheckRouter = Router();
healthcheckRouter.get("/", (req, res) => res.send());

export { healthcheckRouter };
