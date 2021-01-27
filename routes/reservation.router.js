"use strict";

const express = require("express");
const router = express.Router();

const reservationController = require("../controllers/reservation.controller");

router.get("/", reservationController.index);
router.post("/", reservationController.reservation);

module.exports = router;