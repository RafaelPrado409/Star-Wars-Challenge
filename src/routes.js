import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import PlanetController from './app/controllers/PlanetController';
import SearchPlanetByIdController from './app/controllers/SearchPlanetByIdController';
import SearchPlanetByNameController from './app/controllers/SearchPlanetByNameController';

import ValidatePlanetStore from './app/validators/PlanetStore';
import ValidatePlanetUpdate from './app/validators/PlanetUpdate';

const bruteStore = new BruteRedis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

const routes = new Router();

routes.post('/planet', ValidatePlanetStore, PlanetController.store);

routes.get('/planet', bruteForce.prevent, PlanetController.index);
routes.get('/planet/:id', bruteForce.prevent, SearchPlanetByIdController.index);
routes.get(
    '/planetName',
    bruteForce.prevent,
    SearchPlanetByNameController.index
);

routes.put('/planet/:id', ValidatePlanetUpdate, PlanetController.update);

routes.delete('/planet/:id', PlanetController.delete);

export default routes;
