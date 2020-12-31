import { NextFunction, Request, Response } from 'express';

const authorizeApi = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  next();
};

export { authorizeApi };
