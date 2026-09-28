import userService from "../services/userService.js";

const getUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  return res.status(200).send(users);
};

const getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.userId);

  if (!user) {
    return res.status(404).send({ error: "Usuário não encontrado" });
  }

  return res.status(200).send(user);
};

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  return res.status(201).send(user);
};

const updateUser = async (req, res) => {
  const user = await userService.updateUser(req.params.userId, req.body);

  if (!user) {
    return res.status(404).send({ error: "Usuário não encontrado" });
  }

  return res.status(200).send(user);
};

const deleteUser = async (req, res) => {
  const deletedCount = await userService.deleteUser(req.params.userId);

  if (!deletedCount) {
    return res.status(404).send({ error: "Usuário não encontrado" });
  }

  return res.status(204).send();
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
