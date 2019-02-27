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

router.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    if (id) {
        try {
            const tweetData = await Tweet.find({ owner: id })
                                    .populate('owner')
                                    .exec();
            const user = await User.findOne({ _id: id })
                                    .populate('followers')
                                    .populate('following')
                                    .exec();
            if (!user || !tweetData) {
                res.render('main/user', { userFound: [], tweets: [] });
            }
            res.render('main/user', { userFound: user, tweets: tweetData });
        }
        catch (err) {
            res.render('main/user', { userFound: [], tweets: [] });
        }
    } else {
        res.render('main/user', { userFound: [], tweets: [] });
    }
});

module.exports = router;
