import RecommendationError from '../../src/errors/RecommendationError.js';
import * as recommendationRepository from '../../src/repositories/recommendationRepository.js';
import * as recommendationService from '../../src/services/recommendationService.js';
import { generateRecommendationDbResponse } from '../utils/bodyProvider.js';

describe('upvote recommendation', () => {
  jest
    .spyOn(recommendationRepository, 'selectById')
    .mockImplementation(() => generateRecommendationDbResponse());

  jest
    .spyOn(recommendationRepository, 'increaseScore')
    .mockImplementation(() => generateRecommendationDbResponse());

  it('should return with the recommendation when its updated', async () => {
    const response = await recommendationService.upvote({ id: 1 });
    expect(response).toEqual(generateRecommendationDbResponse());
  });

  it('should return NOT_FOUND error when the recommendation id does not exists', async () => {
    jest.spyOn(recommendationRepository, 'selectById').mockImplementationOnce(() => false);

    const response = recommendationService.upvote({ id: 1 });
    expect(response).rejects.toThrowError(RecommendationError);
    response.catch((err) => {
      expect(err.statusCode).toBe(404);
    });
  });
});

describe('upvote recommendation', () => {
  jest
    .spyOn(recommendationRepository, 'selectById')
    .mockImplementation(() => generateRecommendationDbResponse());

  jest
    .spyOn(recommendationRepository, 'decreaseScore')
    .mockImplementation(() => generateRecommendationDbResponse());

  it('should return with the recommendation when its updated', async () => {
    const response = await recommendationService.downvote({ id: 1 });
    expect(response).toEqual(generateRecommendationDbResponse());
  });

  it('should return NOT_FOUND error when the recommendation id does not exists', async () => {
    jest.spyOn(recommendationRepository, 'selectById').mockImplementationOnce(() => false);

    const response = recommendationService.downvote({ id: 1 });
    expect(response).rejects.toThrowError(RecommendationError);
    response.catch((err) => {
      expect(err.statusCode).toBe(404);
    });
  });
});
