import sessionService from "../services/sessionService.js";

const getSession = async (req, res) => {
  const user = await sessionService.getCurrentUser(req.context.me.id);
  return res.send(user);
};

export default {
  getSession,
};
