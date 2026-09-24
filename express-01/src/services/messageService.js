import messageRepository from "../repositories/messageRepository.js";

const getAllMessages = () => messageRepository.findAll();

const getMessageById = (id) => messageRepository.findById(id);

const createMessage = (text, userId) =>
  messageRepository.create({ text, userId });

const deleteMessage = (id) => messageRepository.deleteById(id);

export default {
  getAllMessages,
  getMessageById,
  createMessage,
  deleteMessage,
};
