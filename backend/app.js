require("./config/config");
require("./models/db");
require("./config/passportConfig");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const rtsIndex = require("./routes/index.router");

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use("/api", rtsIndex);

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach((key) =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Serwer uruchomiony na porcie : ${process.env.PORT}`)
);
