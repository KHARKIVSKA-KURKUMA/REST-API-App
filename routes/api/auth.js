const express = require("express");

const { basedir } = global;

const ctrl = require(`${basedir}/controllers/auth`);

const { controllersWrap } = require(`${basedir}/helpers`);

const { auth, upload } = require(`${basedir}/middleware`);

const router = express.Router();

router.post("/register", controllersWrap(ctrl.register));

router.post("/login", controllersWrap(ctrl.login));

router.patch("/:userId/user", controllersWrap(ctrl.updateUserSubscription));

router.get("/current", auth, controllersWrap(ctrl.getCurrent));

router.post("/logout", auth, controllersWrap(ctrl.logout));

router.get("/verify/:verificationToken", controllersWrap(ctrl.verifyEmail));

router.post("/verify", controllersWrap(ctrl.resendVerifyEmail));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  controllersWrap(ctrl.setAvatar)
);

module.exports = router;
