const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const Users = require('../schemas/usersSchema');
require('dotenv').config();

const secret = process.env.SECRET;

const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async function (payload, done) {
    try {
      const user = await Users.findOne({ _id: payload.uid });
      if (!user) {
        return done(new Error('Користувача не знайдено'));
      }

      return done(null, { user, sid: payload.sid });
    } catch (err) {
      return done(err);
    }
  })
);

const guard = (req, res, next) => {
  passport.authenticate('jwt', (err, { user, sid }) => {
    if (!user || err) {
      return res.status(401).json({
        status: 'failure',
        code: 401,
        message: 'Unauthorized',
      });
    }
    req.user = user;
    req.sid = sid;
    next();
  })(req, res, next);
};

module.exports = guard;
