"use strict";

exports.index = (req, res, next) => {
    res.render("contacts", {
        title: "Контакты | Lorem Ipsum",
        name: "contacts",
    });
};