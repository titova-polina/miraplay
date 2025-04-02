const { UsersRepository } = require('../repository');

class UsersServices {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
  }

  async login(body) {
    return this.repositories.users.login(body);
  }

  async registaer(body) {
    return this.repositories.users.register(body);
  }

  async findById(id) {
    return this.repositories.users.findById(id);
  }

  async findByEmail(email) {
    return this.repositories.users.findByEmail(email);
  }
}
module.exports = UsersServices;
