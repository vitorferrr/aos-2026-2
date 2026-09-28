import messageService from "../services/messageService.js";

const getMessages = async (req, res) => {
  const messages = await messageService.getAllMessages();
  return res.status(200).send(messages);
};

const getMessage = async (req, res) => {
  const message = await messageService.getMessageById(req.params.messageId);

  if (!message) {
    return res.status(404).send({ error: "Mensagem não encontrada" });
  }

  return res.status(200).send(message);
};

const createMessage = async (req, res) => {
  const message = await messageService.createMessage(
    req.body.text,
    req.context.me.id,
  );

  return res.status(201).send(message);
};

const updateMessage = async (req, res) => {
  const message = await messageService.updateMessage(
    req.params.messageId,
    req.body.text,
  );

  if (!message) {
    return res.status(404).send({ error: "Mensagem não encontrada" });
  }

  return res.status(200).send(message);
};

const deleteMessage = async (req, res) => {
  await messageService.deleteMessage(req.params.messageId);
  return res.status(204).send();
};

export default {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
};
