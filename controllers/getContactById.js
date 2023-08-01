const { Contact } = require(`../models/contacts`);
const { errorMessage } = require(`../helpers`);

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) throw errorMessage({ status: 404 });
  return res.json(result);
};

module.exports = getContactById;
