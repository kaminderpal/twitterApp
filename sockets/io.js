module.exports = (io) => {
  io.on('connection', (socket) => {
    const { user } = socket.request;
    console.log(`${user.name} connected`);
    socket.on('tweet', (data) => {
      io.emit('incomingTweets', { data, user });
    });
  });
};
