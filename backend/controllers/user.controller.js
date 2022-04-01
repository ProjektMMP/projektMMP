const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const e = require('express');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    User.findOne({ website: req.body.website },
        (err, user) => {
            if (user)
                res.status(422).send(['Nazwa witryny jest już zajęta!']);
        }
    );
    User.findOne({ nickname: req.body.nickname },
        (err, user) => {
            if (user)
                res.status(422).send(['Nazwa użytkownika jest już zajęta!']);
        }
    );
    User.findOne({ email: req.body.email },
        (err, user) => {
            if (user)
                res.status(422).send(['Ten adres e-mail został już użyty do rejestracji!']);
        }
    );
    var user = new User();
    user.website = req.body.website;
    user.nickname = req.body.nickname;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err){
            res.send(doc);
            console.log('Użytkownik zarejestrowany');
        }
        else
        {
            if (err.code == 11000)
                console.log('Użytkownik już istnieje');
            else
                return next(err);
            a=0;
        }
    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userAuthProfile = (req, res, next) =>{
    console.log('pobieram usera');
    console.log('req id:'+req._id);
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'Użytkownik nie znaleziony.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['website','nickname','email', 'password','theme' ]) }); //dane eksportowane do frontu dla auth user
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
                return res.status(200).json({ status: true, user : _.pick(user,['website','nickname','theme' ]) }); //dane eksportowane do frontu dla nie auth user
        }
    );
}

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
    User.findOne({ website: req.body.website},
        (err, user) => {
            if (!user)
                return res.status(405).json({ status: false, message: 'Użytkownik nie znaleziony.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['website','nickname','theme' ]) }); //dane eksportowane do frontu dla nie auth user
        }
    );
}
