const { basedir } = global;
const { Contact, schemas } = require(`${basedir}/models/contacts`);
const { errorMessage } = require(`${basedir}/helpers`);

const editContact = async (req, res) => {
  const { error } = schemas.contactAdd.validate(req.body);
  console.log(error);
  if (error) {
    const length = Object.keys(error._original).length;
    const label = error.details[0].context.label;
    if (length === 0) {
      throw errorMessage({ status: 400, message: "missing fields" });
    }
    if (error.details[0].type === "any.required") {
      throw errorMessage({
        status: 400,
        message: `missing required ${label} field`,
      });
    } else if (error.details[0].type === "string.pattern.base") {
      throw errorMessage({
        status: 400,
        message: `The name must be at least 3 letters long and should consist only of English letters`,
      });
    } else {
      throw errorMessage({
        status: 400,
        message: `${error.details[0].message}`,
      });
    }
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) throw errorMessage({ status: 404 });
  res.json(result);
};

module.exports = editContact;
