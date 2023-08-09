const { basedir } = global;
const { Contact, schemas } = require(`${basedir}/models/contacts`);
const { errorMessage } = require(`${basedir}/helpers`);

const addContact = async (req, res) => {
  const { error } = schemas.contactAdd.validate(req.body);
  if (error) {
    const label = error.details[0].context.label;
    if (error.details[0].type === "any.required") {
      throw errorMessage({
        status: 400,
        message: `missing required ${label} field`,
      });
    } else {
      throw errorMessage({
        status: 400,
        message: `${error.details[0].message}`,
      });
    }
  } else {
    const { id: owner } = req.user;
    try {
      const result = await Contact.create({ ...req.body, owner });
      res.status(201).json(result);
    } catch (err) {
      if (err.code === 11000 && err.keyPattern.email === 1) {
        throw errorMessage({
          status: 409,
          message: `The email '${req.body.email}' already exists. Please use a different email.`,
        });
      } else {
        throw errorMessage({
          status: 500,
          message: "An unexpected error occurred while adding the contact.",
        });
      }
    }
  }
};

module.exports = addContact;
