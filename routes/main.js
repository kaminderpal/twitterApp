const router = require('express').Router();
const Tweet = require('../models/tweet');
const User = require('../models/user');

router.get("/",(req,res,next)=>{
    if(req.user){
        Tweet.find({})
            .sort('-created')
            .populate('owner') // look up schema like forrign keys in table mysql.
            .exec((err,tweets)=>{
                if(err) return next(err);
                res.render("main/home", { tweets : tweets });
            });
    }else{
        res.render("main/landing");
    }
});

module.exports = router;
