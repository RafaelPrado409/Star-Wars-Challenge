import Planet from '../schemas/Planet';

import Cache from '../../lib/Cache';

class SearchPlanetByNameController {
    async index(req, res) {
        const cached = await Cache.get(`planet?search${req.query}`);

        if (cached) {
            return res.json(cached);
        }

        const planet_name = await Planet.findOne(req.query);

        if (!planet_name) {
            return res.status(400).json('The Planet does not exist in MongoDB!');
        }

        return res.json({
            planet_name,
        });
    }
}

export default new SearchPlanetByNameController();
