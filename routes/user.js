const router = require('express').Router();
const User = require('../models/user');

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
                        let newUser = new User();
                        const photo = newUser.gravatar();
                        newUser.name = name;
                        newUser.email = email;
                        newUser.password = password;
                        newUser.photo = photo;
                        console.log(newUser);
                        newUser.save(function(err){
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

module.exports = router;