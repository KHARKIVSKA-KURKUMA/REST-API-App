const { basedir } = global;

const { Contact } = require(`${basedir}/models/contacts`);

const getContactsList = async (_, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

module.exports = getContactsList;
