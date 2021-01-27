const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: 'gmail',
    secure: true,
    auth: {
        user: 'sellardoorrestaurant@gmail.com',
        pass: '261097tosha',
    },
});

exports.sendReservationCode = (to, username, code) => {
    transporter.sendMail({
        from: "sellardoorrestaurant@gmail.com",
        to,
        subject: "Your code!",
        text: `Доброго времени суток, ${username}.`,
        html: `<b>Доброго времени суток, ${username}. Мы прислали вам код: ${code}, необходимый для входа в зал.</b>`,
    });
};