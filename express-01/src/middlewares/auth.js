import jwt from "jsonwebtoken";
import { env } from "../utils/env.js";
import AppError from "../utils/appError.js";
import models from "../models/index.js";
import userService from "../services/userService.js";
import messageService from "../services/messageService.js";

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

export const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!req.context?.me || !roles.includes(req.context.me.role)) {
      return next(
        new AppError("Você não tem permissão para executar esta ação.", 403),
      );
    }
    next();
  };

export const isMessageOwner = async (req, res, next) => {
  try {
    const message = await messageService.getMessageById(req.params.messageId);

    if (!message) {
      throw new AppError("Mensagem não encontrada.", 404);
    }

    const { me } = req.context;

    if (message.userId !== me.id && me.role !== "ADMIN") {
      throw new AppError(
        "Você não tem permissão para alterar ou remover mensagens de outros usuários.",
        403,
      );
    }

    req.message = message;
    next();
  } catch (err) {
    next(err);
  }
};

export const isUserOwner = (req, res, next) => {
  const { me } = req.context;

  if (String(req.params.userId) !== String(me.id) && me.role !== "ADMIN") {
    return next(
      new AppError(
        "Você não tem permissão para modificar o cadastro de outro usuário.",
        403,
      ),
    );
  }
  next();
};

export default auth;
