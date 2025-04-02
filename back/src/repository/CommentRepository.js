const Comment = require('../schemas/commentSchema');

class CommentRepository {
  constructor() {
    this.model = Comment;
  }

  async sendUserComment({ text, user, game }) {
    const comment = new this.model({ text, user, game });
    return comment.save();
  }

  async getGameComments(gameId) {
    return this.model
      .find({ game: gameId })
      .populate([{ path: 'user', select: 'email' }]);
  }

  async getGamesCommentCounts() {
    return this.model.aggregate([
      {
        $group: {
          _id: '$game',
          count: { $sum: 1 },
        },
      },
    ]);
  }
}

module.exports = CommentRepository;
