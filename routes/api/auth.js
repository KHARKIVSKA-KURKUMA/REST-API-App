const express = require("express");

const { basedir } = global;

const ctrl = require(`${basedir}/controllers/auth`);

const { controllersWrap } = require(`${basedir}/helpers`);

const { auth } = require(`${basedir}/middleware`);

const router = express.Router();

router.post("/register", controllersWrap(ctrl.register));

router.post("/login", controllersWrap(ctrl.login));

router.patch("/:userId/user", controllersWrap(ctrl.updateUserSubscription));

router.get("/current", auth, controllersWrap(ctrl.getCurrent));

router.get("/logout", auth, controllersWrap(ctrl.logout));

module.exports = router;
