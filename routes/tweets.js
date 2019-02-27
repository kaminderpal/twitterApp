const Tweet = require('../models/tweet')
const User = require('../models/user')

const createTweet = async ({content,owner}) => {
    try{
        let tweet = new Tweet({ content, owner });
        return await tweet.save();
    }catch(e){
        return Promise.reject(new Error(e.message));
    }
};

const updateUserByTweet = async ({userId,tweetId}) => {

    try{
        return await User.update(
                                        { _id : userId }, 
                                        { $push : { 
                                                    tweets : tweetId
                                                }
                                        }
                                    );
    }
    catch(e){
        return Promise.reject(new Error(e.message));
    }
};


module.exports = { createTweet, updateUserByTweet };