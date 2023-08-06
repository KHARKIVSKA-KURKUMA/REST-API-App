const { basedir } = global;
const { Contact } = require(`${basedir}/models/contacts`);
const { errorMessage } = require(`${basedir}/helpers`);

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw errorMessage({ status: 404 });
  }
  res.json(result);
};

module.exports = getContactById;
