import crypto from "crypto";
import jwt from "jsonwebtoken";
import { env } from "../utils/env.js";
import AppError from "../utils/appError.js";
import userRepository from "../repositories/userRepository.js";
import refreshTokenRepository from "../repositories/refreshTokenRepository.js";

const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const issueTokens = async (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    env.JWT_SECRET,
    { expiresIn: "15m" },
  );

  const refreshToken = crypto.randomBytes(40).toString("hex");

  await refreshTokenRepository.create({
    token: refreshToken,
    userId: user.id,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
  });

  return { token, refreshToken, user };
};

const login = async (login, password) => {
  if (!login || !password) {
    throw new AppError("Login e senha são obrigatórios.", 400);
  }

  const user = await userRepository.findByLogin(login);

  if (!user || !(await user.validatePassword(password))) {
    throw new AppError("Credenciais inválidas.", 401);
  }

  return issueTokens(user);
};

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError("Refresh token é obrigatório.", 400);
  }

  const storedToken = await refreshTokenRepository.findByToken(refreshToken);

  if (!storedToken || !storedToken.user) {
    throw new AppError("Refresh token inválido ou expirado.", 401);
  }

  // Rotação: o token é consumido; se outra requisição já o consumiu, rejeita
  const destroyed = await refreshTokenRepository.deleteById(storedToken.id);

  if (!destroyed || storedToken.expiresAt < new Date()) {
    throw new AppError("Refresh token inválido ou expirado.", 401);
  }

  return issueTokens(storedToken.user);
};

const logout = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError("Refresh token é obrigatório.", 400);
  }

  await refreshTokenRepository.deleteByToken(refreshToken);
};

export default {
  login,
  refresh,
  logout,
};
