const User = require('../schemas/usersSchema');

class UsersRepository {
  constructor() {
    this.model = User;
  }

  async register({ password, ...payload }) {
    const user = new this.model(payload);
    user.setPassword(password);
    await user.save();
    return this.findById(user._id);
  }

  async login({ email, password }) {
    const user = await this.model.findOne({ email });
    if (user) {
      const verified = user.verifyPassword(password);
      if (verified) {
        return this.model.findOne({ _id: user._id }, 'email role');
      }
    }
    return null;
  }

  async findByEmail(email) {
    return this.model.findOne({ email }, 'email role');
  }

  async findById(id) {
    return this.model.findOne({ _id: id }, 'email role');
  }
}

module.exports = UsersRepository;
