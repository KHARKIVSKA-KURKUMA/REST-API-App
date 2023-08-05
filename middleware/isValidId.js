const { isValidObjectId } = require("mongoose");
const { errorMessage } = require(`../helpers`);

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(errorMessage({ status: 404, message: "Not found" }));
  }
  next();
};

module.exports = isValidId;
