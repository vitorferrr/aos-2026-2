import { Router } from "express";
import userController from "../controllers/userController.js";
import middlewares from "../middlewares/index.js";

const router = Router();

router.get(
  "/",
  middlewares.auth,
  middlewares.restrictTo("ADMIN"),
  userController.getUsers,
);
router.get("/:userId", middlewares.auth, userController.getUser);
router.post("/", userController.createUser);
router.put(
  "/:userId",
  middlewares.auth,
  middlewares.isUserOwner,
  userController.updateUser,
);
router.delete(
  "/:userId",
  middlewares.auth,
  middlewares.isUserOwner,
  userController.deleteUser,
);

export default router;
