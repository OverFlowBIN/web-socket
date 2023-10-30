const chatController = require('../Controller/chat.controller');
const userController = require('../Controller/user.controller');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    console.log('client is connected', socket.id);

    socket.on('login', async (userName, cb) => {
      try {
        // 유저 정보를 저장
        const user = await userController.saveUser(userName, socket.id);
        cb({ success: true, data: user });
      } catch (error) {
        cb({ success: false, error: error.message });
      }
    });

    socket.on('sendMessage', async (message, cb) => {
      try {
        // find user
        const user = await userController.checkUser(socket.id);
        // save message
        const newMessage = await chatController.saveChat(message, user);

        // cb({success: true, data: newMessage})
        // => 이렇게 되면 안된다! 모든 클라이언트에게 보내야 한다.
        // io에 접속한 모두에게 알려줘야한다.
        io.emit('message', newMessage);
        cb({ success: true });
      } catch (error) {
        cb({ success: false, error: error.message });
      }
    });

    socket.on('disconnect', () => {
      console.log('user is discoonnected');
    });
  });
};
