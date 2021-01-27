const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// Set up mongoose connection
const mongoose = require("mongoose");
const dev_db_url =
    "mongodb+srv://uv1l:tfwHX9YaKUKg3GGy@restaurant.ssxya.mongodb.net/restaurant?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const indexRouter = require("./routes/index.router");
const reservationRouter = require("./routes/reservation.router");
const contactsRouter = require("./routes/contacts.router");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        key: "user_sid",
        secret: "super duper secret key",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 3600000 },
        store: new MongoStore({ mongooseConnection: db }),
    })
);

app.use("/", indexRouter);
app.use("/reservation", reservationRouter);
app.use("/contacts", contactsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    let status;
    let message;

    if (err.status === 404) {
        status = 404;
        message = "Not Found";
    } else {
        message = "Ups";
        status = "Something Went Wrong";
    }

    res.render("error", { status, message });
});

module.exports = app;