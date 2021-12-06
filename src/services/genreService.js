import * as genreRepository from '../repositories/genreRepository.js';
import GenreError from '../errors/GenreError.js';

export async function getRecommendationGenres({ recommendationId }) {
  const genres = await genreRepository.selectAllByRecommendationId({ recommendationId });

  if (!genres.length) {
    throw new GenreError('Genre Database Eror', 'INTERNAL_SERVER_ERROR');
  }

  return genres;
}

export async function createGenre({ name }) {
  if (await genreRepository.selectByName({ name })) {
    throw new GenreError(`Genre with name "${name}" already exists`, 'CONFLICT');
  }
  const newGenre = await genreRepository.insert({ name });
  if (!newGenre) {
    throw new GenreError('Genre Database Eror', 'INTERNAL_SERVER_ERROR');
  }

  return newGenre;
}
