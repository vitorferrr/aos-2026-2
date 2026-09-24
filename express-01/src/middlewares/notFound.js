const notFound = (req, res) => {
  return res.status(404).send({ error: `Rota não encontrada: ${req.method} ${req.path}` });
};

export default notFound;
