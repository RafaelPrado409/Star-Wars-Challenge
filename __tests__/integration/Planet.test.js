import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';

describe('Planet', () => {
    it('should be register new planet', async() => {
        const planet = await factory.attrs('Planet');
        const response = await request(app)
            .post('/planet')
            .send(planet);

        expect(response.body).toHaveProperty('name');
    });

    it('should not be register a planet that does not exist in StarWars', async() => {
        const planet = await factory.attrs('Planet2');
        const response = await request(app)
            .post('/planet')
            .send(planet);

        expect(response.status).toBe(400);
    });
});