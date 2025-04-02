const { Error: MongooseError } = require('mongoose');
const { MongoServerError } = require('mongodb');
const { HttpCode } = require('../config/constants');

class LocalizedError extends Error {
  constructor(message, reason, code = HttpCode.BAD_REQUEST) {
    super(message);
    this.reason = reason;
    this.code = code;
  }
}

const asyncWrap = (cb) => async (req, res, next) => {
  try {
    const result = await cb(req, res, next);
    return result;
  } catch (err) {
    if (err instanceof LocalizedError) {
      return res.status(err.code).json({
        status: 'failure',
        code: err.code,
        reason: err.reason,
        message: err.message,
      });
    }
    if (err instanceof MongooseError && err.errors) {
      const mongooseError = Object.values(err.errors)?.[0];
      if (mongooseError.path) {
        console.log('MongooseError: ', err);
        return res.status(HttpCode.BAD_REQUEST).json({
          status: 'failure',
          code: HttpCode.BAD_REQUEST,
          path: mongooseError.path,
          message:
            mongooseError.kind?.message ||
            `"${JSON.stringify(
              mongooseError.value || ''
            )}" is not a valid value for "${mongooseError.path}"`,
        });
      }
    }

    if (err instanceof MongoServerError && err.code === 11000) {
      console.log('MongooseError: ', err);
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'failure',
        code: HttpCode.BAD_REQUEST,
        path: Object.keys(err.keyPattern)?.[0],
        message: `"${Object.keys(err.keyPattern)?.[0]}" mast be unique`,
      });
    }

    res.status(HttpCode.BAD_REQUEST).json({
      status: 'failure',
      code: HttpCode.BAD_REQUEST,
      message: 'Error occured. Try again later',
    });

    console.log('Wrapped Error: ', err);
  }
};

module.exports = { asyncWrap, LocalizedError };
