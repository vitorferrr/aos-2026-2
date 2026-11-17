import AppError from "../utils/appError.js";

// Valida body e/ou params com schemas Zod; o body validado substitui req.body
const validate =
  ({ body, params }) =>
  (req, res, next) => {
    const parts = [
      ["params", params, req.params],
      ["body", body, req.body ?? {}],
    ];

    for (const [part, schema, value] of parts) {
      if (!schema) continue;

      const result = schema.safeParse(value);

      if (!result.success) {
        const message = result.error.issues.map((i) => i.message).join(" ");
        return next(new AppError(message, 400));
      }

      if (part === "body") req.body = result.data;
    }

    next();
  };

export default validate;
