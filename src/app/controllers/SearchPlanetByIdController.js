import Planet from '../schemas/Planet';

import Cache from '../../lib/Cache';

class SearchPlanetByIdController {
    async index(req, res) {
        const cached = await Cache.get('planet/:id');

        if (cached) {
            return res.json(cached);
        }
        const planet_id = await Planet.findById(req.params.id);

        if (!planet_id) {
            return res.status(400).json('The Planet does not exist in MongoDB!');
        }

        return res.json({ planet_id });
    }
}

export default new SearchPlanetByIdController();
