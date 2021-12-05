import RecommendationError from '../errors/RecommendationError.js';
import * as recommendationRepository from '../repositories/recommendationRepository.js';
import * as genreService from './genreService.js';
import pseudoRandomOptionsArr from '../utils/pseudoRandomOptionsArr.js';

export async function createRecommendation({ name, youtubeLink, genresIds }) {
  // TO-DO FAZER VERIFICACAO DE GENEROS a partir de genreservice ((?))

  if (await recommendationRepository.selectByName({ name })) {
    throw new RecommendationError(`"${name}" already exists`, 'CONFLICT');
  }

  if (await recommendationRepository.selectByYoutubeLink({ youtubeLink })) {
    throw new RecommendationError('The Youtube link already exists', 'CONFLICT');
  }

  const newRecommendation = await recommendationRepository.insert({ name, youtubeLink, genresIds });
  if (!newRecommendation) {
    throw new RecommendationError('Database Error', 'INTERNAL_SERVER_ERROR');
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
  console.log(songScores);
  console.log('pseudolength: ', pseudoRandomOptionsArr.data.length);

  let recommendationsArr;
  if (songScores === 'greaterThanTen') {
    recommendationsArr = await recommendationRepository.selectWhereScoreGreaterThanTen();
  } else {
    recommendationsArr = await recommendationRepository.selectWhereScoreBetweenMinusFiveAndTen();
  }

  if (!recommendationsArr.length) {
    console.log(recommendationsArr);
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
    chosenSong = recommendationsArr[Math.floor(Math.random() * recommendationsArr.length)];
  }

  console.log(chosenSong);
  const genres = await genreService.getRecommendationGenres({ recommendationId: chosenSong.id });

  return { chosenSong, genres };
}
