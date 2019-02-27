const Tweets = require('../routes/tweets')

module.exports = (io) => {
  io.on('connection', (socket) => {
    const { user } = socket.request;
    console.log(`${user.name} connected`);
    socket.on('tweet', (data) => {
      
      //run multiple tasks.
      io.emit('incomingTweets', { data, user });
      
      const composeTweet = async () => {
        const { content } = data;
        const { _id : owner } = user;
        const tweetResult = await Tweets.createTweet({ content, owner  });
        const updatedUser = await Tweets.updateUserByTweet( { userId : user._id, tweetId : tweetResult._id } );
        return {
                user : updatedUser,
                tweet : tweetResult
        }
      };

      composeTweet()
                    .then( res => {
                      console.log(res);
                    })
                    .catch(err => console.log(err));

    });
  });


};
