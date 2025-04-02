const { HttpCode } = require('../config/constants');
const { UsersServices, AuthServices } = require('../services/index');
const { io } = require('../socket');

const usersServices = new UsersServices();
const authServices = new AuthServices();

const register = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'failure',
      code: HttpCode.BAD_REQUEST,
      message: 'Електронна адреса не була надана',
    });
  }

  if (!password) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'failure',
      code: HttpCode.BAD_REQUEST,
      message: 'Пароль не був нвданий',
    });
  }

  const doubleEmail = await usersServices.findByEmail(email);

  if (doubleEmail) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'failure',
      code: HttpCode.CONFLICT,
      message: 'Користувач з наданою електронною адресою вже існує',
    });
  }

  const user = await usersServices.registaer(req.body);

  const { tokenAccess, tokenRefresh } = await authServices.createSession(user);

  return res.status(HttpCode.CREATED).json({
    status: 'success',
    code: HttpCode.CREATED,
    user,
    tokenAccess,
    tokenRefresh,
  });
};

const login = async (req, res, next) => {
  const user = await usersServices.login(req.body);

  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'failure',
      code: HttpCode.UNAUTHORIZED,
      message:
        'Користувача з наданною електронною адресою не знайдено або введено невірний пароль',
    });
  }

  const { tokenAccess, tokenRefresh } = await authServices.createSession(user);

  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    user,
    tokenAccess,
    tokenRefresh,
  });
};

const refresh = async (req, res, next) => {
  const { user, sid } = req;

  await authServices.logout(sid);

  const { tokenAccess, tokenRefresh } = await authServices.createSession(user);

  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    user,
    tokenAccess,
    tokenRefresh,
  });
};

const logout = async (req, res, next) => {
  await authServices.logout(req.sid);

  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
  });
};

module.exports = {
  login,
  register,
  refresh,
  logout,
};
