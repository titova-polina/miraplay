const { CommentServices } = require('../services/index');
const { HttpCode } = require('../config/constants');
const { io } = require('../socket');

const commentService = new CommentServices();

const getGameComments = async (req, res, next) => {
  const { gameId } = req.params;
  const comments = await commentService.getGameComments(gameId);
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    comments,
  });
};

const sendUserComment = async (req, res, next) => {
  const { gameId } = req.params;
  const user = req.user;
  const { text } = req.body;
  const result = await commentService.sendUserComment({
    text,
    game: gameId,
    user: user._id,
  });

  const gameComments = await commentService.getGameComments(gameId);
  io.to('games').emit(
    'game_comments_updated',
    gameComments.map((comment) => comment.toJSON())
  );

  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    ...result,
  });
};

const getGamesCommentCounts = async (req, res, next) => {
  const comments = await commentService.getGamesCommentCounts();
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    comments,
  });
};

module.exports = {
  getGameComments,
  sendUserComment,
  getGamesCommentCounts,
};
