const express = require("express");

const userControllers = require("../Controllers/users-controller");

const router = express.Router();

router.get("/", userControllers.getUsers);

router.post("/signup", userControllers.signup);
router.post("/signin", userControllers.login);

module.exports = router;
