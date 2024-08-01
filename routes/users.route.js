const express = require("express");
const usersController = require("../controllers/users.controller");
const router = express.Router();

router.post("/login", usersController.login);
router.post("/register", usersController.register);
router.get('/logout', usersController.logout);
router.get('/:uuid', usersController.getProfile);
router.put("/:id", usersController.editProfile);

module.exports = router;
