import { Beach } from './../../src/models/beach';
import { send } from 'process';

describe('Beaches functional tests', () => {
  beforeAll(async () => await Beach.deleteMany({}));

  describe('When creating a beach', () => {
    it('shoul create a beach with success', async () => {
      const newBeach = {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: 'E',
      };

      const response = await await global.testRequest
        .post('/beaches')
        .send(newBeach);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(newBeach));
    });

    it('should return 422 when there is a validation error', async () => {
      const newBeach = {
        lat: 'invalid_string',
        lng: 151.289824,
        name: 'Manly',
        position: 'E',
      };
      const response = await global.testRequest.post('/beaches').send(newBeach);
      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error:
          'Beach validation failed: lat: Cast to Number failed for value "invalid_string" at path "lat"',
      });
    });
  });
});
