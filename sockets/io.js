module.exports = (io) => {
  
  io.on('connection', (socket) => {
    console.log('connected');
    const { user } = socket.request;
    console.log(user.name);
    socket.on('tweet', (data) => {
      console.log(data);
    });
  });
};
