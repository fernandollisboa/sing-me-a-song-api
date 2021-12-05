import statusCode from '../enum/httpStatus.js';

/* eslint-disable no-unused-vars */
export default async function errorMiddleware(err, req, res, next) {
  console.error('Error Middleware: ', err);
  res.sendStatus(statusCode.INTERNAL_SERVER_ERROR);
}
