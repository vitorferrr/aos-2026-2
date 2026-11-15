import models from "../models/index.js";

const findByToken = (token) =>
  models.RefreshToken.findOne({ where: { token }, include: [models.User] });

const create = (data) => models.RefreshToken.create(data);

const deleteById = (id) => models.RefreshToken.destroy({ where: { id } });

const deleteByToken = (token) => models.RefreshToken.destroy({ where: { token } });

export default {
  findByToken,
  create,
  deleteById,
  deleteByToken,
};
