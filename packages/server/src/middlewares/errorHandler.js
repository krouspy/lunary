import { __is_prod__ } from '@config';

export const errorHandler = (error, req, res, next) => {
  const { message, stack } = error;
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message,
    stack: __is_prod__ ? '💥' : stack,
  });
};
