const express = require("express");
const controllers = require(`../../controllers`);
const { controllersWrap } = require(`../../helpers`);

const router = express.Router();

router.get("/", controllersWrap(controllers.getContactsList));

router.get("/:contactId", controllersWrap(controllers.getContactById));

router.post("/", controllersWrap(controllers.addContact));

router.delete("/:contactId", controllersWrap(controllers.removeContact));

router.put("/:contactId", controllersWrap(controllers.editContact));

router.patch(
  "/:contactId/favourite",
  controllersWrap(controllers.updateStatusContact)
);

module.exports = router;
