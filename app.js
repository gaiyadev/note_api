var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

const config = require("config");
require("dotenv").config();
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/api/users");
var notesRouter = require("./routes/api/notes");
const { log } = require("console");

var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter);

const PORT = 3000

app.listen(PORT, () => {
console.log("RUNING "+ PORT)
}) 
// module.exports = app;
