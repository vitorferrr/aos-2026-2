import models from "../models/index.js";
import userService from "../services/userService.js";

const context = async (req, res, next) => {
  try {
    req.context = {
      models,
      me: await userService.getUserByLogin("rwieruch"),
    };
    next();
  } catch (err) {
    next(err);
  }
};

export default context;
