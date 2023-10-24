const asyncWrapper = (FN) => {
  return async (req, res, next) => {
    try {
      await FN(req, res, next);
    } catch (error) {
      // passing the error to be handled by the next middleware
      next(error);
    }
  };
};

module.exports = asyncWrapper;
