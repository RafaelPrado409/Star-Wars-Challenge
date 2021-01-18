import Planet from '../schemas/Planet';
import api from '../../services/api';

import Cache from '../../lib/Cache';

class PlanetController {
    async store(req, res) {
        const planetExists = await Planet.findOne({
            name: req.body.name,
        });

        if (planetExists) {
            return res
                .status(400)
                .json({ error: 'Planet already exist at the galaxy!' });
        }

        const isStarWarPlanet = await api.get(`planets?search=${req.body.name}`);

        const { count } = isStarWarPlanet.data;

        if (count === 0) {
            return res
                .status(400)
                .json('The Planet does not exist in StarWars Universe!');
        }

        const response = await api.get(`planets?search=${req.body.name}`);
        const { films } = response.data.results[0];

        const appearances = films.length;

        const { name, climate, terrain } = await Planet.create(req.body);

        await Planet.findOneAndUpdate({
            name,
        }, {
            appearances,
        });

        return res.json({
            name,
            climate,
            terrain,
            appearances,
        });
    }

    async index(req, res) {
        const cached = await Cache.get('planet');

        if (cached) {
            return res.json(cached);
        }
        const planets = await Planet.find().sort({ createdAt: -1 });

        return res.json(planets);
    }

    async update(req, res) {
        const planet_id = await Planet.findById(req.params.id);

        if (!planet_id) {
            return res.status(400).json('The Planet does not exist in MongoDB!');
        }

        await Planet.findOneAndUpdate(req.params.id, {
            climate: req.body.climate,
            terrain: req.body.terrain,
        });

        const planet = await Planet.findById(req.params.id);

        return res.json(planet);
    }

    async delete(req, res) {
        const planet_id = await Planet.findByIdAndRemove(req.params.id);

        if (!planet_id) {
            return res.status(400).json('The Planet does not exist in MongoDB!');
        }

        await Cache.invalidatePrefix('planet');

        return res.json('Planet was destroyed by stormtroopers!');
    }
}

export default new PlanetController();
