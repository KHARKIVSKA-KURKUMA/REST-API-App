const express = require("express");
const contacts = require("../../models/contacts");
const Joi = require("joi");
const { errorMessage } = require("../../helpers");

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

/* ----------------------------------- GET ---------------------------------- */
router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});
/* -------------------------------- GET BY ID ------------------------------- */
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) throw errorMessage({ status: 404 });
    return res.json(result);
  } catch (error) {
    next(error);
  }
});
/* ---------------------------------- PUSH ---------------------------------- */
router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
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
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});
/* --------------------------------- DELETE --------------------------------- */
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) throw errorMessage({ status: 404 });
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});
/* ---------------------------------- EDIT ---------------------------------- */
router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
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
      } else {
        throw errorMessage({
          status: 400,
          message: `${error.details[0].message}`,
        });
      }
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) throw errorMessage({ status: 404 });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
