import * as genreRepository from '../repositories/genreRepository.js';
import GenreError from '../errors/GenreError.js';

export async function getRecommendationGenres({ recommendationId }) {
  const genres = await genreRepository.selectAllByRecommendationId({ recommendationId });

  return genres;
}

export async function createGenre({ name }) {
  if (await genreRepository.selectByName({ name })) {
    throw new GenreError(`Genre with name "${name}" already exists`, 'CONFLICT');
  }
  const newGenre = await genreRepository.insert({ name });

  return newGenre;
}

export async function checkIfExists({ genresIds }) {
  const result = await Promise.all(genresIds.map(async (id) => genreRepository.selectById({ id })));

  for (let i = 0; i < result.length; i += 1) {
    if (!result[i]) {
      throw new GenreError(`Genre with id = ${genresIds[i]} does not exists.`, 'NOT_FOUND');
    }
  }
  return true;
}
