/* eslint-disable no-await-in-loop */
import RecommendationError from '../../src/errors/RecommendationError.js';
import * as recommendationRepository from '../../src/repositories/recommendationRepository.js';
import * as recommendationService from '../../src/services/recommendationService.js';
import * as genreService from '../../src/services/genreService.js';
import { generateRecommendationDbResponse } from '../utils/bodyProvider.js';

describe('get random recommendation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should return NOT_FOUND when there are no recommendations registered yet', async () => {
    jest.spyOn(recommendationRepository, 'selectAll').mockImplementationOnce(() => false);

    jest
      .spyOn(genreService, 'getRecommendationGenres')
      .mockImplementation(() => [{ id: 1, name: 'rock' }]);

    const response = recommendationService.getRandom();
    expect(response).rejects.toThrowError(RecommendationError);
    response.catch((err) => {
      expect(err.statusCode).toBe(404);
    });
  });

  it('should return 70/30 when there are recommendations with score below and above ten ', async () => {
    jest
      .spyOn(recommendationRepository, 'selectAll')
      .mockImplementation(() => [{ score: 11 }, { score: 10 }]);
    jest
      .spyOn(recommendationRepository, 'selectWhereScoreGreaterThanTen')
      .mockImplementation(() => [generateRecommendationDbResponse({ score: 11 })]);
    jest
      .spyOn(recommendationRepository, 'selectWhereScoreBetweenMinusFiveAndTen')
      .mockImplementation(() => [generateRecommendationDbResponse({ score: 10 })]);
    jest
      .spyOn(genreService, 'getRecommendationGenres')
      .mockImplementation(() => [{ id: 1, name: 'rock' }]);
    const results = [];
    for (let i = 0; i < 10; i += 1) {
      const currentResult = await recommendationService.getRandom();
      results.push(currentResult.chosenSong.score);
    }

    results.sort();
    expect(results).toEqual([10, 10, 10, 11, 11, 11, 11, 11, 11, 11]);
  });

  it('should return any recommendation when the score values do not fill the range (lessThanTen)', async () => {
    jest
      .spyOn(recommendationRepository, 'selectAll')
      .mockImplementation(() => [generateRecommendationDbResponse({ score: 9 })]);
    jest.spyOn(genreService, 'getRecommendationGenres').mockImplementationOnce(() => [
      { id: 1, name: 'rock' },
      { id: 2, name: 'lofi' },
    ]);

    const currentResult = await recommendationService.getRandom();
    console.log(currentResult);
    const { id, name, youtubeLink, score } = currentResult.chosenSong;
    const { genres } = currentResult;
    const body = { id, name, genres: [genres], youtubeLink, score };

    console.log(body);
    expect(body).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      genres: expect.any(Array),
      youtubeLink: expect.any(String),
      score: expect.any(Number),
    });
  });

  it('should return any recommendation when the score values do not fill the range (moreThanOrEqualTen)', async () => {
    jest
      .spyOn(recommendationRepository, 'selectAll')
      .mockImplementation(() => [generateRecommendationDbResponse({ score: 10 })]);
    jest.spyOn(genreService, 'getRecommendationGenres').mockImplementationOnce(() => [
      { id: 1, name: 'rock' },
      { id: 2, name: 'lofi' },
    ]);

    const currentResult = await recommendationService.getRandom();

    const { id, name, youtubeLink, score } = currentResult.chosenSong;
    const { genres } = currentResult;
    const body = { id, name, genres, youtubeLink, score };

    expect(body).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      genres: expect.any(Array),
      youtubeLink: expect.any(String),
      score: expect.any(Number),
    });
  });
});
