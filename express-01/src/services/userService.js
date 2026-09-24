import userRepository from "../repositories/userRepository.js";

const getAllUsers = () => userRepository.findAll();

const getUserById = (id) => userRepository.findById(id);

const getUserByLogin = (login) => userRepository.findByLogin(login);

export default {
  getAllUsers,
  getUserById,
  getUserByLogin,
};
