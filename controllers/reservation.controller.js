"use strict";

const { validationResult, body } = require("express-validator");

const Reservation = require("../models/reservation.model");
const { sendReservationCode } = require("../utils/nodemailer");

exports.index = async(req, res, next) => {
    try {
        res.render("reservation-form");
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.reservation = [
    body("username")
    .trim()
    .isLength({ min: 1, max: 50 })
    .escape()
    .withMessage("Username must be 1-50 characters long"),

    body("email").trim().isEmail().withMessage("Invalid Email"),

    async(req, res, next) => {
        const code = Math.random().toString(36).substring(6);

        const {
            username,
            email,
        } = req.body;

        await Promise.allSettled([
            sendReservationCode(email, username, code),

            Reservation.findOneAndUpdate({
                $push: {
                    clients: {
                        username,
                        email,
                        code,
                    },
                },
            }, { upsert: true, new: true }),
        ]);

        setTimeout(() => { res.render("index"); }, 2000);
    }
];