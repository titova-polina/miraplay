const express = require('express');
const router = express.Router();
const { asyncWrap } = require('../../helpers/asyncWrap');
const {
  login,
  register,
  refresh,
  logout,
  getOnline,
} = require('../../controllers/userCtrl');
const guard = require('../../helpers/guard');

router.post('/register', asyncWrap(register));
router.post('/login', asyncWrap(login));
router.post('/', guard, asyncWrap(refresh));
router.post('/logout', guard, asyncWrap(logout));

module.exports = router;
