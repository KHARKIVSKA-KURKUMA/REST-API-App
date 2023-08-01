const { Contact, schemas } = require(`../models/contacts`);
const { errorMessage } = require(`../helpers`);

const updateStatusContact = async (req, res) => {
  const { error } = schemas.updateFavourite.validate(req.body);
  if (error) {
    throw errorMessage({
      status: 400,
      message: "missing field favourite or wrong data type",
    });
  }

  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) throw errorMessage({ status: 404 });
  res.json(result);
};
module.exports = updateStatusContact;
