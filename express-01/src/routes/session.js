import { Router } from "express";
import sessionController from "../controllers/sessionController.js";
import middlewares from "../middlewares/index.js";

const router = Router();

router.post("/", middlewares.authLimiter, sessionController.login);
router.get("/", middlewares.auth, sessionController.getSession);

export default router;
