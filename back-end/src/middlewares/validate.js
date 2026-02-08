export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
     const formattedErrors = err?.issues?.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      }));

      return res.status(400).json({
        message: "Validation process error",
        errors: formattedErrors,
      });
  }
};