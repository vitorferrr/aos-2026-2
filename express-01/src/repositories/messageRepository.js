import models from "../models/index.js";

const findAll = () => models.Message.findAll();

const findById = (id) => models.Message.findByPk(id);

const create = (data) => models.Message.create(data);

const deleteById = (id) => models.Message.destroy({ where: { id } });

export default {
  findAll,
  findById,
  create,
  deleteById,
};
