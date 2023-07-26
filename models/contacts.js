const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

/* --------------------------------- RECEIVE -------------------------------- */
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    return err;
  }
};

/* -------------------------------- GET BY ID ------------------------------- */
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

/* --------------------------------- REMOVE --------------------------------- */
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
  return removeContact;
};
/* ----------------------------------- ADD ---------------------------------- */
const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: uuid(),
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
  return newContact;
};
/* ---------------------------------- EDIT ---------------------------------- */
const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
