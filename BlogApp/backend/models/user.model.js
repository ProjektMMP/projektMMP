const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema({
  website: {
    type: String,
    required: "Nazwa witryny nie może być pusta",
    unique: true,
  },
  nickname: {
    type: String,
    required: "Nazwa użytkownika nie może być pusta",
    unique: true,
  },
  email: {
    type: String,
    required: "E-mail nie może być pusty",
    unique: true,
  },
  password: {
    type: String,
    required: "Hasło nie może być puste",
    minlength: [4, "Hasło musi zawierać przynajmniej 4 znaki"],
  },
  theme:{
    type: Number,
    default: '1',
    maxLength: [1]
},
  saltSecret: String,
  resetLink: {
    data: String,
    default: "",
  },
});

userSchema.path("email").validate((val) => {
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Nieprawidłowy adres e-mail.");

userSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

const resettokenSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  resettoken: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
});

module.exports = mongoose.model("passwordResetToken", resettokenSchema);
mongoose.model("User", userSchema);
