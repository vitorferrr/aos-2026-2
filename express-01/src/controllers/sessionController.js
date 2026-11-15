import sessionService from "../services/sessionService.js";

const login = async (req, res) => {
  const { login, password } = req.body;
  const { token, user } = await sessionService.login(login, password);

  return res.status(200).send({
    status: "success",
    data: {
      token,
      user: { id: user.id, username: user.username, email: user.email },
    },
  });
};

const getSession = async (req, res) => {
  return res.status(200).send(req.context.me);
};

export default {
  login,
  getSession,
};
