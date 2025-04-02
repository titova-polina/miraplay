const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: process.env.HOSTS,
});
const UsersServices = require('../services/UserServices');
const AuthServices = require('../services/AuthService');
const jwt = require('jsonwebtoken');

const authService = new AuthServices();
const usersService = new UsersServices();

io.on('connection', async (socket) => {
  console.log('SOCKET CONNECTIONS:', io.engine.clientsCount);

  try {
    const { tokenAccess } = socket.handshake.auth;
    if (!tokenAccess)
      throw new Error('DISCONNECT SOCKET NO_AUTH: ' + socket.id);
    const { uid, sid } = authService.verifyToken(tokenAccess) || {};
    const session = await authService.findById(sid);
    const user = await usersService.findById(uid);

    if (!session || !user)
      throw new Error('DISCONNECT SOCKET INVALID_AUTH: ' + socket.id);
    else {
      socket.user = {
        id: user._id.toString(),
        role: user.role,
        email: user.email,
      };
      io.emit('user_count', io.engine.clientsCount);
      socket.on('disconnect', (reason) => {
        io.emit('user_count', io.engine.clientsCount);
        console.log('SOCKET ', socket.user, ' DISCONNECTED: ', reason);
      });
    }
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      console.log('SOCKET ERROR TOKEN EXPIRED: ', err.expiredAt);
    } else {
      console.log('SOCKET ERROR handleConnection: ', err);
    }
    if (socket.user) {
      console.log('SOCKET USER: ', socket.user);
      io.in(socket.id).socketsLeave([socket.user.role, socket.user.id]);
    }
    socket.disconnect(true);
  }
});

server.listen(process.env.SOCKET_PORT, () => {
  console.log(`Socket server is running on port :${process.env.SOCKET_PORT}`);
});

module.exports = { io };
