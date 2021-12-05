import * as genreRepository from '../repositories/genreRepository.js';
import GenreError from '../errors/GenreError.js';

export async function getRecommendationGenres({ recommendationId }) {
  const genres = await genreRepository.selectAllByRecommendationId({ recommendationId });

  console.log(genres);
  if (!genres.length) {
    throw new GenreError('Genre Database Eror', 'INTERNAL_SERVER_ERROR');
  }

  return genres;
}
