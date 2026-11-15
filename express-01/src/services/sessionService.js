import jwt from "jsonwebtoken";
import { env } from "../utils/env.js";
import AppError from "../utils/appError.js";
import userRepository from "../repositories/userRepository.js";

const login = async (login, password) => {
  if (!login || !password) {
    throw new AppError("Login e senha são obrigatórios.", 400);
  }

  const user = await userRepository.findByLogin(login);

  if (!user || !(await user.validatePassword(password))) {
    throw new AppError("Credenciais inválidas.", 401);
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    env.JWT_SECRET,
    { expiresIn: "15m" },
  );

  return { token, user };
};

export default {
  login,
};
