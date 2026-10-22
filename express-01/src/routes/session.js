import { Router } from "express";
import sessionController from "../controllers/sessionController.js";
import middlewares from "../middlewares/index.js";

const router = Router();

router.use(middlewares.authLimiter);

router.get("/", sessionController.getSession);

export default router;
