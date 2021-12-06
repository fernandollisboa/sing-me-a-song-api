/* eslint-disable no-param-reassign */
import RecommendationError from '../errors/RecommendationError.js';
import * as recommendationRepository from '../repositories/recommendationRepository.js';
import * as genreService from './genreService.js';
import pseudoRandomOptionsArr from '../utils/pseudoRandomOptionsArr.js';

export async function createRecommendation({ name, youtubeLink, genresIds }) {
  await genreService.checkIfExists({ genresIds });

  if (await recommendationRepository.selectByName({ name })) {
    throw new RecommendationError(`"${name}" already exists`, 'CONFLICT');
  }

  if (await recommendationRepository.selectByYoutubeLink({ youtubeLink })) {
    throw new RecommendationError('The Youtube link already exists', 'CONFLICT');
  }

  const newRecommendation = await recommendationRepository.insert({ name, youtubeLink, genresIds });
  if (!newRecommendation) {
    throw new RecommendationError('Recommendation Database Error', 'INTERNAL_SERVER_ERROR');
  }

  return newRecommendation;
}

export async function upvote({ id }) {
  if (!(await recommendationRepository.selectById({ id }))) {
    throw new RecommendationError(`Song with id = ${id} not found`, 'NOT_FOUND');
  }

  const updatedRecommendation = await recommendationRepository.increaseScore({ id });
  if (!updatedRecommendation) {
    throw new RecommendationError('Database Error', 'INTERNAL_SERVER_ERROR');
  }

  return updatedRecommendation;
}

export async function downvote({ id }) {
  if (!(await recommendationRepository.selectById({ id }))) {
    throw new RecommendationError(`Song with id = ${id} not found`, 'NOT_FOUND');
  }

  const updatedRecommendation = await recommendationRepository.decreaseScore({ id });
  if (!updatedRecommendation) {
    throw new RecommendationError('Database Error', 'INTERNAL_SERVER_ERROR');
  }

  return updatedRecommendation;
}

async function fetchWeightedRandomRecommendation() {
  const songScores = pseudoRandomOptionsArr.pop();

  let recommendationsArr;
  if (songScores === 'greaterThanTen') {
    recommendationsArr = await recommendationRepository.selectWhereScoreGreaterThanTen();
  } else {
    recommendationsArr = await recommendationRepository.selectWhereScoreBetweenMinusFiveAndTen();
  }

  if (!recommendationsArr.length) {
    throw new RecommendationError('Recommendation Database Error', 'INTERNAL_SERVER_ERROR');
  }

  const chosenSong = recommendationsArr[Math.floor(Math.random() * recommendationsArr.length)];

  return chosenSong;
}

export async function getRandom() {
  const allRecommendations = await recommendationRepository.selectAll();
  if (!allRecommendations.length) {
    throw new RecommendationError('There are no songs registered yet', 'NOT_FOUND');
  }

  const greaterThanTen = allRecommendations.some((elem) => elem.score > 10);
  const lessThanOrEqualTen = allRecommendations.some(
    (elem) => elem.score < 10 || elem.score === 10,
  );

  let chosenSong;
  if (greaterThanTen && lessThanOrEqualTen) {
    chosenSong = await fetchWeightedRandomRecommendation();
  } else {
    const recommendationsArr = await recommendationRepository.selectAll();
    if (!recommendationsArr.length) {
      throw new RecommendationError('Recommendation Database Error', 'INTERNAL_SERVER_ERROR');
    }

    chosenSong = recommendationsArr[Math.floor(Math.random() * recommendationsArr.length)];
  }

  const genres = await genreService.getRecommendationGenres({ recommendationId: chosenSong.id });

  return { chosenSong, genres };
}

export async function getTopAmount({ amount }) {
  const recommendations = await recommendationRepository.selectOrderByScoreLimitDesc({
    limit: amount,
  });

  if (!recommendations?.length) {
    throw new RecommendationError('There are no songs registered yet', 'NOT_FOUND');
  }

  await Promise.all(
    recommendations.map(async (r) => {
      r.genres = await genreService.getRecommendationGenres({ recommendationId: r.id });
    }),
  );

  return recommendations;
}
