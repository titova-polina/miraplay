const { CommentRepository } = require('../repository');

class CommentServices {
  constructor() {
    this.repositories = {
      comment: new CommentRepository(),
    };
  }

  async getGameComments(gameId) {
    return this.repositories.comment.getGameComments(gameId);
  }

  async sendUserComment(body) {
    return this.repositories.comment.sendUserComment(body);
  }

  async getGamesCommentCounts() {
    return this.repositories.comment.getGamesCommentCounts();
  }
}
module.exports = CommentServices;
