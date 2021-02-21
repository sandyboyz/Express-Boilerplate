import { NextFunction, Request, Response } from 'express';
import HttpException from '../errors/HttpExpection';
import { logger } from '../logger';

export default <T extends HttpException>(
  error: T,
  req: Request,
  res: Response,
  _next: NextFunction,
): Response<unknown> => {
  const isDebug = req.query.debug === '1';

  const errorMessage: Omit<HttpException, 'statusCode'> = {
    name: error.name,
    message: error.message,
    data: error.data,
  };

  logger.error(error, error.message);

  if (isDebug) {
    errorMessage.stack = error.stack;
  }

  if (error instanceof HttpException) {
    return res.status(error.statusCode).json(errorMessage);
  }

  if (isDebug) {
    return res.status(500).json(errorMessage);
  }

  return res.status(500).json({
    name: 'Internal Server Error',
    message: 'Please contact administrator',
  });
};
