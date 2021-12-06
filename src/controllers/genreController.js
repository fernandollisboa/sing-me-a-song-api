/* eslint-disable consistent-return */
import genreSchema from '../validations/genreValidation.js';
import statusCode from '../enum/httpStatus.js';
import * as genreService from '../services/genreService.js';
import GenreError from '../errors/GenreError.js';

export async function postGenre(req, res, next) {
  try {
    const joiValidation = genreSchema.validate(req.body);
    if (joiValidation.error) {
      throw new GenreError(joiValidation.error.message);
    }

    const { name } = req.body;
    if (!name.trim()) {
      throw new GenreError('Name cannot contain only white space');
    }

    const newGenre = await genreService.createGenre({ name });

    return res.status(statusCode.CREATED).send(newGenre);
  } catch (err) {
    if (err instanceof GenreError) {
      console.error(err.stack);
      return res.status(err.statusCode).send(err.message);
    }

    next(err);
  }
}
