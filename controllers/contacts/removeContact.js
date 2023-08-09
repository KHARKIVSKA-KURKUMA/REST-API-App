const { basedir } = global;
const { Contact } = require(`${basedir}/models/contacts`);
const { errorMessage } = require(`${basedir}/helpers`);

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) throw errorMessage({ status: 404 });
  res.json({ message: "contact deleted" });
};

module.exports = removeContact;
