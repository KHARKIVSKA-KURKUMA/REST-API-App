const express = require("express");
const { basedir } = global;
const controllers = require(`${basedir}/controllers/contacts`);
const { controllersWrap } = require(`${basedir}/helpers`);
const { auth, isValidId } = require(`${basedir}/middleware`);
const router = express.Router();

router.get("/", auth, controllersWrap(controllers.getContactsList));

router.get(
  "/:contactId",
  isValidId,
  auth,
  controllersWrap(controllers.getContactById)
);

router.post("/", auth, controllersWrap(controllers.addContact));

router.delete(
  "/:contactId",
  isValidId,
  auth,
  controllersWrap(controllers.removeContact)
);

router.put("/:contactId", isValidId, controllersWrap(controllers.editContact));

router.patch(
  "/:contactId/favorite",
  isValidId,
  auth,
  controllersWrap(controllers.updateStatusContact)
);

module.exports = router;
