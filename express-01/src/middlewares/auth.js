import jwt from "jsonwebtoken";
import { env } from "../utils/env.js";
import AppError from "../utils/appError.js";
import models from "../models/index.js";
import userService from "../services/userService.js";

const auth = async (req, res, next) => {
  try {
    const [scheme, token] = (req.headers.authorization || "").split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new AppError("Token de autenticação não fornecido.", 401);
    }

    let payload;
    try {
      payload = jwt.verify(token, env.JWT_SECRET);
    } catch {
      throw new AppError("Token de autenticação inválido ou expirado.", 401);
    }

    const me = await userService.getUserById(payload.id);

    if (!me) {
      throw new AppError("Token de autenticação inválido ou expirado.", 401);
    }

    req.context = { models, me };
    next();
  } catch (err) {
    next(err);
  }
};

export default auth;
