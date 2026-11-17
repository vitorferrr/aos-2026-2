import tarefaService from "../services/tarefaService.js";

const criarTarefa = async (req, res) => {
  const tarefa = await tarefaService.criarTarefa(req.body);
  return res.status(201).send(tarefa);
};

const listarTarefas = async (req, res) => {
  const tarefas = await tarefaService.listarTarefas();
  return res.status(200).send(tarefas);
};

const buscarTarefa = async (req, res) => {
  const tarefa = await tarefaService.buscarTarefa(req.params.objectId);
  return res.status(200).send(tarefa);
};

const atualizarTarefa = async (req, res) => {
  const tarefa = await tarefaService.atualizarTarefa(
    req.params.objectId,
    req.body,
  );
  return res.status(200).send(tarefa);
};

const removerTarefa = async (req, res) => {
  await tarefaService.removerTarefa(req.params.objectId);
  return res
    .status(200)
    .send({ status: "success", message: "Tarefa removida com sucesso." });
};

export default {
  criarTarefa,
  listarTarefas,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa,
};
