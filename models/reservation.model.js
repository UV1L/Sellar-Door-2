"use strict";

const { Schema, model } = require("mongoose");

const reservationSchema = new Schema({
    clients: [{
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
    }, ],
});

module.exports = model("Reservation", reservationSchema);