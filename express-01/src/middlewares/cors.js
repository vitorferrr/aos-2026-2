import { env } from "../utils/env.js";
import cors from "cors";

const allowedOrigins = env.ALLOWED_ORIGINS.split(",")
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
