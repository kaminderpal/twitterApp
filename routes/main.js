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
    const { _id: userId } = req.user;
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
                res.render('main/user', { userFound: [], tweets: [], currentUser: false });
            }
            const { _id: dataId, followers } = user;
            const follower = followers.some(friend => friend.equals(userId));


            res.render('main/user', {
                                        userFound: user,
                                        tweets: tweetData,
                                        follower,
                                        currentUser: userId.equals(dataId),
                                    });
        }
        catch (err) {
            res.render('main/user', { userFound: [], tweets: [], currentUser: false });
        }
    } else {
        res.render('main/user', { userFound: [], tweets: [], currentUser: false });
    }
});
router.post('/follow/:id', async (req, res) => {
    const { id: followId } = req.params;
    const { _id: userId } = req.user;
    try {
        const udpateFollowing = await User.update(
                                            { 
                                                _id: userId,
                                                following: {
                                                    $ne: followId,
                                                } 
                                            },
                                            {
                                                $push: {
                                                    following: followId,
                                                }
                                            });
        const updateFollower = await User.update({
                                                    _id : followId,
                                                    followers: {
                                                        $ne : userId
                                                    }
                                                },
                                                    {
                                                        $push: {
                                                            followers: userId
                                                        }
                                                });
            if( !udpateFollowing || !updateFollower ){
                return res.status(404).send();
            }    
            return res.status(200).send("success");
    }
    catch(err){
        res.sendStatus(404)
    }










});

module.exports = router;
