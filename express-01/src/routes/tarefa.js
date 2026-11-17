import { Router } from "express";
import tarefaController from "../controllers/tarefaController.js";
import middlewares from "../middlewares/index.js";
import {
  objectIdParams,
  criarTarefaBody,
  atualizarTarefaBody,
} from "../schemas/tarefaSchema.js";

const router = Router();
const validarId = middlewares.validate({ params: objectIdParams });

router.post(
  "/",
  middlewares.validate({ body: criarTarefaBody }),
  tarefaController.criarTarefa,
);
router.get("/", tarefaController.listarTarefas);
router.get("/:objectId", validarId, tarefaController.buscarTarefa);
router.put(
  "/:objectId",
  middlewares.validate({
    params: objectIdParams,
    body: atualizarTarefaBody,
  }),
  tarefaController.atualizarTarefa,
);
router.delete("/:objectId", validarId, tarefaController.removerTarefa);

export default router;
