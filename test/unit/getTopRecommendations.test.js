import RecommendationError from '../../src/errors/RecommendationError.js';
import * as recommendationRepository from '../../src/repositories/recommendationRepository.js';
import * as genreService from '../../src/services/genreService.js';
import * as recommendationService from '../../src/services/recommendationService.js';
import { generateRecommendationDbResponse } from '../utils/bodyProvider.js';

describe('get top amount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should return NOT_FOUND when there are no recommendations registered', async () => {
    jest
      .spyOn(recommendationRepository, 'selectOrderByScoreLimitDesc')
      .mockImplementation(() => {});

    const response = recommendationService.getTopAmount({ amount: 1 });
    expect(response).rejects.toThrowError(RecommendationError);
    response.catch((err) => {
      expect(err.name).toBe('RecommendationError');
      expect(err.statusCode).toBe(404);
    });
  });
  it('should return with the top songs when there are reccomendations registered', async () => {
    jest
      .spyOn(recommendationRepository, 'selectOrderByScoreLimitDesc')
      .mockImplementation(() => [generateRecommendationDbResponse()]);
    jest.spyOn(genreService, 'getRecommendationGenres').mockImplementation(() => [
      { id: 1, name: 'rock' },
      { id: 2, name: 'lofi' },
    ]);

    const response = await recommendationService.getTopAmount({ amount: 1 });
    expect(response).toEqual([
      {
        id: expect.any(Number),
        name: expect.any(String),
        genres: expect.any(Array),
        youtubeLink: expect.any(String),
        score: expect.any(Number),
      },
    ]);
  });
});
