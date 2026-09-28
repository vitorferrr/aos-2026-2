import sessionService from "../services/sessionService.js";

const getSession = async (req, res) => {
  const user = await sessionService.getCurrentUser(req.context.me.id);

  if (!user) {
    return res.status(401).send({ error: "Não autenticado" });
  }

  return res.status(200).send(user);
};

export default {
  getSession,
};
