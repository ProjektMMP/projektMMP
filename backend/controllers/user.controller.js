const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");
const e = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const User = mongoose.model("User");
const passwordResetToken = mongoose.model("passwordResetToken");

module.exports.register = (req, res, next) => {
  User.findOne(
    {
      website: req.body.website.replace(/  +/g, ' '),
    },
    (err, user) => {
      if (user) res.status(422).send(["Nazwa witryny jest już zajęta!"]);
    }
  );
  User.findOne(
    {
      nickname: req.body.nickname,
    },
    (err, user) => {
      if (user) res.status(422).send(["Nazwa użytkownika jest już zajęta!"]);
    }
  );
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (user)
        res
          .status(422)
          .send(["Ten adres e-mail został już użyty do rejestracji!"]);
    }
  );
  var user = new User();
  user.website = req.body.website.replace(/  +/g, ' ');
  user.nickname = req.body.nickname;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save((err, doc) => {
    if (!err) {
      res.send(doc);
      console.log("Użytkownik zarejestrowany");
    } else {
      if (err.code == 11000) console.log("Użytkownik już istnieje");
      else return next(err);
      a = 0;
    }
  });
};

module.exports.authenticate = (req, res, next) => {
  // call for passport authentication
  passport.authenticate("local", (err, user, info) => {
    // error from passport middleware
    if (err) return res.status(400).json(err);
    // registered user
    else if (user)
      return res.status(200).json({
        token: user.generateJwt(),
      });
    // unknown user or wrong password
    else return res.status(404).json(info);
  })(req, res);
};

module.exports.userAuthProfile = (req, res, next) =>{
  console.log('pobieram usera');
  console.log('req id:'+req._id);
  User.findOne({ _id: req._id },
      (err, user) => {
          if (!user)
              return res.status(404).json({ status: false, message: 'Użytkownik nie znaleziony.' });
          else
              return res.status(200).json({ status: true, user : _.pick(user,['website','nickname','email', 'password', 'theme', 'isVisible']) }); //dane eksportowane do frontu dla auth user
      }
  );
}

module.exports.userProfile = (req, res, next) =>{
    console.log('pobieram usera');
    console.log('req id:'+req._id);
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'Użytkownik nie znaleziony.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['website','nickname','email', 'password', 'theme', 'isVisible' ]) }); //dane eksportowane do frontu dla nie auth user
        }
    );
}
// module.exports.ResetPasswordOld = async(req, res) => {
//     if (!req.body.email) {
//         return res.status(500).json({ message: 'Email jest wymagany' });
//     }
//     console.log('error 0');
//     const user = await User.findOne({email:req.body.email});
//     if (!user) {
//         console.log('error 1');
//         return res.status(409).json({ message: 'Użytkownik nie istnieje!' });
//     }
//     console.log('error 2');
//     var resettoken = new passwordResetToken({ _userId: user._id, resettoken: crypto.randomBytes(16).toString('hex') });
//     resettoken.save(function (err) {
//     if (err) {
//         return res.status(500).send({ msg: err.message });
//     }
//     passwordResetToken.find({ _userId: user._id, resettoken: { $ne: resettoken.resettoken } }).deleteOne().exec();
//     res.status(200).json({ message: 'Link do maila wysłany.' });
//     console.log('Link do maila wysłany');
//     var transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       port: 465,
//       auth: {
//         user: 'blogappdonotrespond@gmail.com',
//         pass: 'blogapp1234'
//       }
//     });
//     var mailOptions = {
//     to: user.email,
//     from: 'marcinmrocz98@gmail.com',
//     subject: 'Reset hasła BlogApp',
//     text: 'Otrzymałeś tego maila, ponieważ z twojego e-maila wysłano prośbę o zresetowanie hasła na naszej stronie. Wejdź w poniższy link aby dokonać zmiany hasła:\n\n' +
//     'http://localhost:4200/responseresetpassword/' + resettoken.resettoken + '\n\n' +
//     'Jeśli to nie Ty, prosimy o zignorowanie tego maila, hasło nie zostanie zmienione.\n'
//     }
//     transporter.sendMail(mailOptions, (err, info) => {
//       // if(error){
//        //     console.log(error);
//       //  }else{
//       //  }
//     })
//     })
//     }

module.exports.ForgotPassword = async (req, res) => {
  if (!req.body) {
    return res.status(409).json({
      message: "Email jest wymagany",
    });
  }
  const { email } = req.body;
  User.findOne(
    {
      email,
    },
    (err, user) => {
      if (!user) {
        console.log("Uzytkownik nie istnieje");
        return res.status(409).json({
          message: "Użytkownik nie istnieje!",
        });
      }
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.RESET_PASSWORD_KEY,
        {
          expiresIn: "20m",
        }
      );
      var transporter = nodemailer.createTransport({
        service: "Gmail",
        port: 465,
        auth: {
          user: "blogappdonotrespond@gmail.com",
          pass: "blogapp1234",
        },
      });
      const data = {
        from: "noreply@blogapp.com",
        to: email,
        subject: "Zmiana hasła",
        html: `
                <h2>Kliknij na poniższy link aby zresetować hasło:
                <p>http://localhost:4200/responseresetpassword/${token}</p>
                `,
      };
      return user.updateOne(
        {
          resetLink: token,
        },
        function (err, success) {
          if (err) {
            console.log("Error link");
            return res.status(400).json({
              error: "Reset password link error",
            });
          } else {
            console.log("Mail wysłany");
            transporter.sendMail(data, function (error, body) {
              if (error) {
                return res.json({
                  error: err.message,
                });
              }
              return res.json({
                message: "Email wysłany",
              });
            });
          }
        }
      );
    }
  );
};

module.exports.ResetPassword = async (req, res) => {
  console.log(req.body);
  resetLink = req.body.userToken;
  newPass = req.body.newPassword;
  // const { resetLink, newPass } = req.body;
  console.log(resetLink, newPass);
  if (resetLink) {
    jwt.verify(
      resetLink,
      process.env.RESET_PASSWORD_KEY,
      function (error, decodedData) {
        if (error) {
          // console.log('Error token!');
          return res.status(401).json({
            error: "Nieprawidłowy token!",
          });
        }
        User.findOne(
          {
            resetLink,
          },
          (err, user) => {
            if (err || !user) {
              //  console.log('Taki token nie istnieje!');
              return res.status(400).json({
                error: "Link wygasł lub jest nieprawidłowy!",
              });
            }
            const obj = {
              password: newPass,
              resetLink: "",
            };
            user = _.extend(user, obj);
            user.save((err, result) => {
              if (err) {
                console.log("Error resetowania!");
                return res.status(400).json({
                  error: "Błąd przy zmianie hasła!",
                });
              } else {
                //  console.log('Hasło zmienione!')
                return res.json({
                  message: "Hasło zmienione!",
                });
              }
            });
          }
        );
      }
    );
  } else {
    return res.status(401).json({
      error: "Błąd autoryzacji",
    });
  }
};

module.exports.ChangePasswordSettings = (req, res) => {
  const oldPass = req.body.passwordOld;
  const newPass = req.body.newPassword;
  User.findOne(
    {
      nickname: req.body.nickname,
      password: oldPass,
    },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "Błędne hasło!",
        });
      }
      const obj = {
        password: newPass,
      };
      user = _.extend(user, obj);
      user.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: "Reset password error",
          });
        } else {
          console.log('Hasło zmienione');
          return res.json({
            message: "Password changed",
          });
        }
      });
    }
  );
};

module.exports.updateTheme=(req,res, next)=>{
  console.log('fajnie jest: '+req.__id);
  User.updateOne({ nickname:req.body.nickname},{$set:{theme:req.body.theme}},{upsert:true}, function (err,doc){

      if(err) return res.status(213).json({status:false, message: 'Update nie poszedl po naszej mysli'})
      else (!err)
      {
          //console.log('ale czy na pewno ?');
          return res.status(271).json({status:true, message: 'Sukces updejtu'})
      }
  })
}

module.exports.askAndGetBlog=(req,res,next)=>{
  console.log('askAndGetBlog: '+req.body.website);
  console.log('Widoczny?' + req.body.isVisible);
  User.findOne({ website: req.body.website},
      (err, user) => {
          if (!user)
              return res.status(405).json({ status: false, message: 'Użytkownik nie znaleziony.' });
          else
              return res.status(200).json({ status: true, user : _.pick(user,['website','nickname','theme','isVisible' ]) }); //dane eksportowane do frontu dla nie auth user
      }
  );
}

module.exports.hideBlog = (req, res) => {
  console.log("Ukrywanie bloga...");
  User.updateOne({nickname:req.body.nickname},{$set:{isVisible: false}},{upsert:true}, function (err,doc){
    if(err) return res.status(213).json({status:false, message: 'Coś się popsuło...'})
    else (!err)
    {
        //console.log('ale czy na pewno ?');
        return res.status(271).json({status:true, message: 'Blog ukryty!'})
    }
  })
}

module.exports.showBlog = (req, res) => {
  console.log("Udostępnianie bloga na świat...");
  User.updateOne({nickname:req.body.nickname},{$set:{isVisible: true}},{upsert:true}, function (err,doc){
    if(err) return res.status(213).json({status:false, message: 'Coś się popsuło...'})
    else (!err)
    {
        //console.log('ale czy na pewno ?');
        return res.status(271).json({status:true, message: 'Blog już nie jest ukryty!'})
    }
  })
}

module.exports.deleteAccount = (req, res) => {
  User.deleteOne({nickname:req.body.nickname}, function (err, doc){
    if(err) return res.status(213).json({status:false, message: 'Coś się popsuło...'})
    else (!err)
    {
        //console.log('ale czy na pewno ?');
        return res.status(271).json({status:true, message: 'Konto usunięte, papa!'})
    }
  })
}