/* eslint-disable consistent-return */
import { recommendationSchema, idSchema } from '../validations/recommendationValidation.js';
import statusCode from '../enum/httpStatus.js';
import RecommendationError from '../errors/RecommendationError.js';
import * as recommendationService from '../services/recommendationService.js';

export async function postRecommendation(req, res, next) {
  try {
    const joiValidation = recommendationSchema.validate(req.body);
    if (joiValidation.error) {
      throw new RecommendationError(joiValidation.error.message);
    }

    const { name, youtubeLink, genresIds } = req.body;
    if (!name.trim()) {
      throw new RecommendationError('Name cannot contain only white space');
    }

    await recommendationService.createRecommendation({ name, youtubeLink, genresIds });

    return res.sendStatus(statusCode.CREATED);
  } catch (err) {
    if (err instanceof RecommendationError) {
      console.error(err.message);
      console.error(err.stack);
      return res.status(err.statusCode).send(err.message);
    }

    next(err);
  }
}

export async function upvote(req, res, next) {
  try {
    const joiValidation = idSchema.validate(req.params);
    if (joiValidation.error) {
      throw new RecommendationError(joiValidation.error.message);
    }

    const { id } = req.params;

    const updatedRecommendation = await recommendationService.upvote({ id });
    return res.status(statusCode.OK).send(updatedRecommendation);
  } catch (err) {
    if (err instanceof RecommendationError) {
      console.error(err.message);
      console.error(err.stack);
      return res.status(err.statusCode).send(err.message);
    }

    next(err);
  }
}
