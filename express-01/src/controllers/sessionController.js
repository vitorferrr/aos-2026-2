import sessionService from "../services/sessionService.js";

const sendTokens = (res, { token, refreshToken, user }) =>
  res.status(200).send({
    status: "success",
    data: {
      token,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    },
  });

const login = async (req, res) => {
  const { login, password } = req.body;
  return sendTokens(res, await sessionService.login(login, password));
};

const refresh = async (req, res) => {
  return sendTokens(res, await sessionService.refresh(req.body.refreshToken));
};

const logout = async (req, res) => {
  await sessionService.logout(req.body.refreshToken);
  return res.status(204).send();
};

const getSession = async (req, res) => {
  return res.status(200).send(req.context.me);
};

export default {
  login,
  refresh,
  logout,
  getSession,
};
