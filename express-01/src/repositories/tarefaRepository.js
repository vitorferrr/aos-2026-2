import models from "../models/index.js";

const findAll = () => models.Tarefa.findAll({ order: [["createdAt", "ASC"]] });

const findById = (objectId) => models.Tarefa.findByPk(objectId);

const create = (data) => models.Tarefa.create(data);

const updateById = async (objectId, data) => {
  const tarefa = await models.Tarefa.findByPk(objectId);

  if (!tarefa) {
    return null;
  }

  return tarefa.update(data);
};

const deleteById = (objectId) => models.Tarefa.destroy({ where: { objectId } });

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
