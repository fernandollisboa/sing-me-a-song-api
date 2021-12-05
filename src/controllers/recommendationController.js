/* eslint-disable consistent-return */
import recommendationValidation from '../validations/recommendationValidation.js';
import statusCode from '../enum/httpStatus.js';
import RecommendationError from '../errors/RecommendationError.js';
import * as recommendationService from '../services/recommendationService.js';

export async function postRecommendation(req, res) {
  const joiValidation = recommendationValidation.validate(req.body);
  if (joiValidation.error) {
    console.log(joiValidation.error);
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  const { name, youtubeLink, genresIds } = req.body;

  if (!name.trim() || !youtubeLink.trim()) return res.sendStatus(statusCode.BAD_REQUEST);

  try {
    await recommendationService.createRecommendation({ name, youtubeLink, genresIds });

    return res.sendStatus(statusCode.CREATED);
  } catch (err) {
    if (err instanceof RecommendationError) {
      console.log(err.stack, err.message);
      return res.status(err.statusCode).send(err.message);
    }
    console.log(err);
    return res.sendStatus(statusCode.BAD_REQUEST);
    // next();
  }
}
