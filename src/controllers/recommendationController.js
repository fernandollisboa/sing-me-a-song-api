/* eslint-disable consistent-return */
import {
  recommendationSchema,
  idSchema,
  topAmountSchema,
} from '../validations/recommendationValidation.js';
import statusCode from '../enum/httpStatus.js';
import RecommendationError from '../errors/RecommendationError.js';
import * as recommendationService from '../services/recommendationService.js';
import GenreError from '../errors/GenreError.js';

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

    const newRecommendation = await recommendationService.createRecommendation({
      name,
      youtubeLink,
      genresIds,
    });

    return res.status(statusCode.CREATED).send(newRecommendation);
  } catch (err) {
    if (err instanceof RecommendationError) {
      console.error(err.stack);
      return res.status(err.statusCode).send(err.message);
    }
    if (err instanceof GenreError) {
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
      console.error(err.stack);
      return res.status(err.statusCode).send(err.message);
    }

    next(err);
  }
}

export async function downvote(req, res, next) {
  try {
    const joiValidation = idSchema.validate(req.params);
    if (joiValidation.error) {
      throw new RecommendationError(joiValidation.error.message);
    }

    const { id } = req.params;

    const updatedRecommendation = await recommendationService.downvote({ id });
    return res.status(statusCode.OK).send(updatedRecommendation);
  } catch (err) {
    if (err instanceof RecommendationError) {
      console.error(err.stack);
      return res.status(err.statusCode).send(err.message);
    }

    next(err);
  }
}

export async function getRandom(req, res, next) {
  try {
    const randomRecommendation = await recommendationService.getRandom();

    const { id, name, youtubeLink, score } = randomRecommendation.chosenSong;
    const { genres } = randomRecommendation;
    const body = { id, name, genres, youtubeLink, score };

    return res.status(statusCode.OK).send(body);
  } catch (err) {
    if (err instanceof RecommendationError) {
      console.error(err.stack);
      return res.status(err.statusCode).send(err.message);
    }
    if (err instanceof GenreError) {
      console.error(err.stack);
      return res.status(err.statusCode).send(err.message);
    }
    next(err);
  }
}

export async function getTopAmout(req, res, next) {
  try {
    const joiValidation = topAmountSchema.validate(req.params);
    if (joiValidation.error) {
      throw new RecommendationError(joiValidation.error.message);
    }

    const { amount } = req.params;

    const recommendations = await recommendationService.getTopAmount({ amount });
    return res.send(recommendations).status(statusCode.OK);
  } catch (err) {
    if (err instanceof RecommendationError) {
      console.error(err.stack);
      return res.status(err.statusCode).send(err.message);
    }
    next();
  }
}
