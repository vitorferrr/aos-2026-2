import models from "../models/index.js";

const findAll = () => models.User.findAll();

const findById = (id) => models.User.findByPk(id);

const findByLogin = (login) => models.User.findByLogin(login);

const create = (data, options) => models.User.create(data, options);

const updateById = async (id, data) => {
  const user = await models.User.findByPk(id);

  if (!user) {
    return null;
  }

  return user.update(data);
};

const deleteById = (id) => models.User.destroy({ where: { id } });

export default {
  findAll,
  findById,
  findByLogin,
  create,
  updateById,
  deleteById,
};
