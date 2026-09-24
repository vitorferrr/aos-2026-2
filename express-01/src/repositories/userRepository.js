import models from "../models/index.js";

const findAll = () => models.User.findAll();

const findById = (id) => models.User.findByPk(id);

const findByLogin = (login) => models.User.findByLogin(login);

const create = (data, options) => models.User.create(data, options);

export default {
  findAll,
  findById,
  findByLogin,
  create,
};
