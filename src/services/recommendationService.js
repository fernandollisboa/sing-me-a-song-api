import RecommendationError from '../errors/RecommendationError.js';
import * as recommendationRepository from '../repositories/recommendationRepository.js';

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

  return updatedRecommendation; // TO-DO ver se precisa disso msm pro teste
}

export async function downvote({ id }) {
  if (!(await recommendationRepository.selectById({ id }))) {
    throw new RecommendationError(`Song with id = ${id} not found`, 'NOT_FOUND');
  }

  const updatedRecommendation = await recommendationRepository.decreaseScore({ id });
  if (!updatedRecommendation) {
    throw new RecommendationError('Database Error', 'INTERNAL_SERVER_ERROR');
  }

  return updatedRecommendation; // TO-DO ver se precisa disso msm pro teste
}
