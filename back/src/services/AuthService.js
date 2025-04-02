const { UsersRepository } = require('../repository');
const Session = require('../schemas/sessionsSchema');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const secret = process.env.SECRET;

class AuthServices {
  constructor() {
    this.model = Session;
    this.repositories = {
      users: new UsersRepository(),
    };
  }

  async createSession({ _id: uid, role }) {
    const session = new this.model({ uid });
    session.save();
    const sessionPayload = {
      uid,
      sid: session._id,
      role,
    };
    return {
      sid: session._id,
      tokenAccess: jwt.sign(sessionPayload, secret, { expiresIn: '1d' }),
      tokenRefresh: jwt.sign(sessionPayload, secret, { expiresIn: '7d' }),
    };
  }

  async findById(sid) {
    return this.model.findOne({ _id: sid });
  }

  async logout(sid) {
    return this.model.findByIdAndDelete(sid);
  }

  verifyToken(token) {
    const payload = jwt.verify(token, secret);
    return payload;
  }
}

module.exports = AuthServices;
