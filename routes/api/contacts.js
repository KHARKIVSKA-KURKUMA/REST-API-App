const express = require("express");
const controllers = require(`../../controllers/contacts`);
const { controllersWrap } = require(`../../helpers`);
const { isValidId } = require("../../middleware");

const router = express.Router();

router.get("/", controllersWrap(controllers.getContactsList));

router.get(
  "/:contactId",
  isValidId,
  controllersWrap(controllers.getContactById)
);

router.post("/", controllersWrap(controllers.addContact));

router.delete(
  "/:contactId",
  isValidId,
  controllersWrap(controllers.removeContact)
);

router.put("/:contactId", isValidId, controllersWrap(controllers.editContact));

router.patch(
  "/:contactId/favorite",
  isValidId,
  controllersWrap(controllers.updateStatusContact)
);

module.exports = router;
