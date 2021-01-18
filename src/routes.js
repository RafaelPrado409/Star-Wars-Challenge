import { Router } from 'express';

import PlanetController from './app/controllers/PlanetController';
import SearchPlanetByIdController from './app/controllers/SearchPlanetByIdController';
import SearchPlanetByNameController from './app/controllers/SearchPlanetByNameController';

import ValidatePlanetStore from './app/validators/PlanetStore';
import ValidatePlanetUpdate from './app/validators/PlanetUpdate';

const routes = new Router();

routes.post('/planet', ValidatePlanetStore, PlanetController.store);

routes.get('/planet', PlanetController.index);
routes.get('/planet/:id', SearchPlanetByIdController.index);
routes.get('/planetName', SearchPlanetByNameController.index);

routes.put('/planet/:id', ValidatePlanetUpdate, PlanetController.update);

routes.delete('/planet/:id', PlanetController.delete);

export default routes;
