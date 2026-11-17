import AppError from "../utils/appError.js";
import tarefaRepository from "../repositories/tarefaRepository.js";

const NAO_ENCONTRADA = "Tarefa não encontrada.";

const criarTarefa = (data) => tarefaRepository.create(data);

const listarTarefas = () => tarefaRepository.findAll();

const buscarTarefa = async (objectId) => {
  const tarefa = await tarefaRepository.findById(objectId);

  if (!tarefa) {
    throw new AppError(NAO_ENCONTRADA, 404);
  }

  return tarefa;
};

const atualizarTarefa = async (objectId, data) => {
  const tarefa = await tarefaRepository.updateById(objectId, data);

  if (!tarefa) {
    throw new AppError(NAO_ENCONTRADA, 404);
  }

  return tarefa;
};

const removerTarefa = async (objectId) => {
  const removidas = await tarefaRepository.deleteById(objectId);

  if (!removidas) {
    throw new AppError(NAO_ENCONTRADA, 404);
  }
};

export default {
  criarTarefa,
  listarTarefas,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa,
};
