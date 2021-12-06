import RecommendationError from '../../src/errors/RecommendationError.js';
import * as recommendationRepository from '../../src/repositories/recommendationRepository.js';
import * as genreRepository from '../../src/repositories/genreRepository.js';
import * as recommendationService from '../../src/services/recommendationService.js';
import {
  generateRecommendationDbResponse,
  generateRecommendationBody,
} from '../utils/bodyProvider.js';

describe('create recommendation', () => {
  jest
    .spyOn(recommendationRepository, 'insert')
    .mockImplementation(() => generateRecommendationDbResponse());

  jest.spyOn(genreRepository, 'selectById').mockImplementation(() => ({ id: 1, name: 'rock' }));

  it('should return with the new recommendation when its succesfully created', async () => {
    jest.spyOn(recommendationRepository, 'selectByName').mockImplementationOnce(() => {});
    jest.spyOn(recommendationRepository, 'selectByYoutubeLink').mockImplementationOnce(() => {});

    const response = await recommendationService.createRecommendation(generateRecommendationBody());
    expect(response).toEqual(generateRecommendationDbResponse());
  });

  it('should throw CONFLICT error when the name is already registered', async () => {
    jest.spyOn(recommendationRepository, 'selectByName').mockImplementationOnce(() => true);

    const response = recommendationService.createRecommendation(generateRecommendationBody());
    expect(response).rejects.toThrowError(RecommendationError);
    response.catch((err) => {
      expect(err.statusCode).toBe(409);
    });
  });

  it('should throw CONFLICT error when the youtubeLink is already registered', async () => {
    jest.spyOn(recommendationRepository, 'selectByName').mockImplementationOnce(() => {});
    jest.spyOn(recommendationRepository, 'selectByYoutubeLink').mockImplementationOnce(() => true);

    const response = recommendationService.createRecommendation(generateRecommendationBody());
    expect(response).rejects.toThrowError(RecommendationError);
    response.catch((err) => {
      expect(err.statusCode).toBe(409);
    });
  });
});
