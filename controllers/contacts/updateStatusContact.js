const { basedir } = global;
const { Contact, schemas } = require(`${basedir}/models/contacts`);
const { errorMessage } = require(`${basedir}/helpers`);

const updateStatusContact = async (req, res) => {
  const { error } = schemas.updateFavorite.validate(req.body);
  if (error) {
    const errorPath = error.details[0];
    if (error) {
      if (errorPath.type === "any.required") {
        throw errorMessage({
          status: 400,
          message: "missing field favorite",
        });
      } else if (errorPath.type === "boolean.base") {
        throw errorMessage({
          status: 400,
          message: "wrong data type",
        });
      } else {
        throw errorMessage({
          status: 400,
          message: errorPath.message,
        });
      }
    }
  }

  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) throw errorMessage({ status: 404 });
  res.json(result);
};
module.exports = updateStatusContact;
