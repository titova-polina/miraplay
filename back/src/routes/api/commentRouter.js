const express = require('express');
const router = express.Router();
const guard = require('../../helpers/guard');

const { asyncWrap } = require('../../helpers/asyncWrap');

const {
  getGameComments,
  sendUserComment,
  getGamesCommentCounts,
} = require('../../controllers/commentCtrl');

router.get('/counts', guard, asyncWrap(getGamesCommentCounts));
router.get('/:gameId', guard, asyncWrap(getGameComments));
router.post('/:gameId', guard, asyncWrap(sendUserComment));

module.exports = router;
