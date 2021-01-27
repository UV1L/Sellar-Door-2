"use strict";

const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts.controller");

router.get("/", contactsController.index);

module.exports = router;
