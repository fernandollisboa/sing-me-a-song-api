import GenreError from '../../src/errors/GenreError.js';
import * as genreRepository from '../../src/repositories/genreRepository.js';
import * as genreService from '../../src/services/genreService.js';

describe('create genre', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should return with the new genre when its succesfully created', async () => {
    jest.spyOn(genreRepository, 'insert').mockImplementation(() => ({ id: 1, name: 'rock' }));
    jest.spyOn(genreRepository, 'selectByName').mockImplementation(() => {});

    const response = await genreService.createGenre({ name: 'rock' });
    expect(response).toEqual({ id: expect.any(Number), name: 'rock' });
  });
  it('should return with CONFLICT error when the name is already registered', async () => {
    jest.spyOn(genreRepository, 'insert').mockImplementation(() => {});
    jest.spyOn(genreRepository, 'selectByName').mockImplementation(() => true);

    const response = genreService.createGenre({ name: 'rock' });
    expect(response).rejects.toThrowError(GenreError);
    response.catch((err) => {
      expect(err.name).toBe('GenreError');
      expect(err.statusCode).toBe(409);
    });
  });
});

describe('get recommendation genre', () => {
  it('should return with the recommendation genres if everything is valid', async () => {
    jest
      .spyOn(genreRepository, 'selectAllByRecommendationId')
      .mockImplementation(() => [{ id: 1, name: 'rock' }]);

    const response = await genreService.getRecommendationGenres({ recommendationId: 1 });
    expect(response[0]).toEqual({ id: expect.any(Number), name: 'rock' });
  });
});

describe('check if genre exists', () => {
  it('should return NOT_FOUND if genre does not exists ', async () => {
    jest.spyOn(genreRepository, 'selectById').mockImplementation(() => false);

    const response = genreService.checkIfExists({ genresIds: [1, 2, 3] });
    expect(response).rejects.toThrowError(GenreError);
    response.catch((err) => {
      expect(err.name).toEqual('GenreError');
      expect(err.statusCode).toBe(404);
    });
  });
  it('should return with the genre if exists ', async () => {
    jest.spyOn(genreRepository, 'selectById').mockImplementation(() => ({ id: 1, name: 'rock' }));

    const response = genreService.checkIfExists({ genresIds: [1] });
    expect(response).toBeTruthy();
  });
});
