const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user');
const passportAuth = require('../middleware/passport');


router.route("/signup")
      .get((req,res,next)=>{
          res.render('accounts/signup', {message : req.flash('errors')});
      })
      .post( (req,res,next) => {
          const {email,name,password} = req.body;
           if( email && name && password ){ 
            User.findOne({email},function(err,existingUser){
                    if(existingUser){
                        req.flash('errors','Account already exist for this email');
                        res.redirect('/signup');
                    }else{
                        let user = new User();
                        const photo = user.gravatar();
                        user.name = name;
                        user.email = email;
                        user.password = password;
                        user.photo = photo;
                        user.save(function(err){
                            if(err)return next(err);
                            res.redirect("/"); 
                        });
                    }
            });
        }
        else{
            req.flash('errors','Some fields are missings.');
            res.redirect('/signup');
        }
      });

router.route("/login")
      .get((req,res,next)=>{
          if(req.user) res.redirect("/");
          res.render('accounts/login',{message : req.flash('loginMessage')});
      })
      .post(passport.authenticate('local-login', {
          successRedirect : "/",
          failureRedirect : "/login",
          failureFlash : true
      }))
router.get("/logout",(req,res,next)=>{
    req.logout();
    res.redirect("/");
})


module.exports = router;