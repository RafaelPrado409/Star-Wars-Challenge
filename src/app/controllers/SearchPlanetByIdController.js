import Planet from '../schemas/Planet';

class SearchPlanetByIdController {
  async index(req, res) {
    const planet_id = await Planet.findById(req.params.id);

    if (!planet_id) {
      return res.status(400).json('The Planet does not exist in MongoDB!');
    }

    return res.json({ planet_id });
  }
}

export default new SearchPlanetByIdController();
