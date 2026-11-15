import cors from "./cors.js";
import { limiter, authLimiter } from "./rateLimiter.js";
import logger from "./logger.js";
import auth from "./auth.js";
import notFound from "./notFound.js";
import errorHandler from "./errorHandler.js";

export default {
  cors,
  limiter,
  authLimiter,
  logger,
  auth,
  notFound,
  errorHandler,
};
