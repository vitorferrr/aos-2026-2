import userRepository from "../repositories/userRepository.js";

const getCurrentUser = (userId) => userRepository.findById(userId);

export default {
  getCurrentUser,
};
