import { Router } from "express";
import messageController from "../controllers/messageController.js";
import middlewares from "../middlewares/index.js";

const router = Router();

router.use(middlewares.auth);

router.get("/", messageController.getMessages);
router.get("/:messageId", messageController.getMessage);
router.post("/", messageController.createMessage);
router.put("/:messageId", messageController.updateMessage);
router.delete("/:messageId", messageController.deleteMessage);

export default router;
