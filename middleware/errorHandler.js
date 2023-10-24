// Adding custom error handler.

const { CustomErrorClass } = require("../errors/custom-errors");

const errorHandlerMiddleWare = (err, req, res, next) => {
  // err.message will be the value we passed while creating a custom error object in tasks.js
  if (err instanceof CustomErrorClass) {
    return res.status(err.statusCode).json({ err: err.message });
  }
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleWare;
