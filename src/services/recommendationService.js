import RecommendationError from '../errors/RecommendationError.js';
import * as recommendationRepository from '../repositories/recommendationRepository.js';

export async function createRecommendation({ name, youtubeLink, genresIds }) {
  // TO-DO FAZER VERIFICACAO DE GENEROS a partir de genreservice ((?))

  if (await recommendationRepository.selectByName({ name })) {
    throw new RecommendationError('Duplicate recommendation name', 'CONFLICT');
  }

  if (await recommendationRepository.selectByYoutubeLink({ youtubeLink })) {
    throw new RecommendationError('Duplicate recommendation youtube link', 'CONFLICT');
  }

  try {
    const newRecommendation = await recommendationRepository.insert({
      name,
      youtubeLink,
      genresIds,
    });

    if (!newRecommendation) {
      throw new RecommendationError('Error inserting recommendation', 'BAD_REQUEST');
    }

    return newRecommendation;
  } catch {
    throw new RecommendationError('Error inserting recommendation', 'BAD_REQUEST');
  }
}
