const handleError = (err, req, res, next) => {
  console.error(err); // Log full error for debugging

  // Joi validation error
  if (err.isJoi) {
    const messages = err.details.map((detail) => detail.message);
    return res.status(400).send({ errors: messages });
  }

  // Custom validation error (e.g., from express-openapi-validator)
  if (err.name === "ValidateError") {
    return res.status(400).send({ message: err.message });
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    return res.status(400).send({ message: "Invalid ID format." });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(409).send({ message: "Duplicate key error." });
  }

  // General error fallback
  return res.status(500).send({
    message: err.message || "Internal Server Error",
  });
};

module.exports = { handleError };
