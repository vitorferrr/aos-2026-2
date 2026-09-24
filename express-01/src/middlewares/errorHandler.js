const errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  return res.status(status).send({ error: err.message || "Erro interno do servidor" });
};

export default errorHandler;
