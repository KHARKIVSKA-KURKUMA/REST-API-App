const express = require("express");
const contacts = require("../../models/contacts");
const Joi = require("joi");
const { errorMessage, catchAsync } = require("../../helpers");

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

/* ----------------------------------- GET ---------------------------------- */
// router.get("/", async (req, res, next) => {
//   try {
//     const result = await contacts.listContacts();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });
router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  })
);
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
      throw errorMessage({
        status: 400,
        message: "missing required name field",
      });
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
      throw errorMessage({ status: 400, message: "missing fields" });
    }
    const { contactId } = req.params;
    const result = await contacts.updateContactById(contactId, req.body);
    if (!result) throw errorMessage({ status: 404 });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
