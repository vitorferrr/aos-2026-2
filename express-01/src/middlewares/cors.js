import cors from "cors";

const allowedOrigins = (
  process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://localhost:3001"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export default cors({
  origin: (origin, callback) => {
    // Sem Origin: apps mobile nativos, Postman, cURL
    if (!origin) return callback(null, true);
    // Origem não autorizada: false (sem lançar erro) para o navegador bloquear
    return callback(null, allowedOrigins.includes(origin));
  },
  credentials: true,
});
