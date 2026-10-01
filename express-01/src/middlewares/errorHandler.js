import AppError from "../utils/appError.js";

const handleSequelizeValidationError = (err) => {
  const message = err.errors.map((error) => error.message).join(". ");
  return new AppError(message, 400);
};

const handleSequelizeUniqueConstraintError = (err) => {
  const message = `Registro duplicado: ${err.errors.map((error) => error.path).join(", ")} já está em uso`;
  return new AppError(message, 409);
};

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (err.name === "SequelizeValidationError") {
    error = handleSequelizeValidationError(err);
  } else if (err.name === "SequelizeUniqueConstraintError") {
    error = handleSequelizeUniqueConstraintError(err);
  } else if (!(err instanceof AppError)) {
    error = new AppError("Algo deu errado no servidor", 500);
  }

  const response = {
    status: error.status,
    message: error.message,
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  return res.status(error.statusCode).send(response);
};

export default errorHandler;
