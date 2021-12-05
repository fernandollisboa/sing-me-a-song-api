import statusCode from '../enum/httpStatus.js';

class GenreError extends Error {
  constructor(message, httpStatus) {
    super(message);
    this.name = 'GenreError';
    this.statusCode = statusCode[httpStatus] || 400;
  }
}

export default GenreError;
