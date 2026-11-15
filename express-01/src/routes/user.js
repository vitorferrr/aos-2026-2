import { Router } from "express";
import userController from "../controllers/userController.js";
import middlewares from "../middlewares/index.js";

const router = Router();

router.get("/", middlewares.auth, userController.getUsers);
router.get("/:userId", middlewares.auth, userController.getUser);
router.post("/", userController.createUser);
router.put("/:userId", middlewares.auth, userController.updateUser);
router.delete("/:userId", middlewares.auth, userController.deleteUser);

export default router;
