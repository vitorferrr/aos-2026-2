import { Router } from "express";
import sessionController from "../controllers/sessionController.js";
import middlewares from "../middlewares/index.js";

const router = Router();

router.post("/", middlewares.authLimiter, sessionController.login);
router.post("/refresh", sessionController.refresh);
router.delete("/", sessionController.logout);
router.get("/", middlewares.auth, sessionController.getSession);

export default router;
