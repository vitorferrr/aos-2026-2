import userRepository from "../repositories/userRepository.js";

const getAllUsers = () => userRepository.findAll();

const getUserById = (id) => userRepository.findById(id);

const getUserByLogin = (login) => userRepository.findByLogin(login);

const createUser = (data) => userRepository.create(data);

const updateUser = (id, data) => userRepository.updateById(id, data);

const deleteUser = (id) => userRepository.deleteById(id);

export default {
  getAllUsers,
  getUserById,
  getUserByLogin,
  createUser,
  updateUser,
  deleteUser,
};
