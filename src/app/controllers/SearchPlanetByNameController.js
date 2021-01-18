import Planet from '../schemas/Planet';

class SearchPlanetByNameController {
  async index(req, res) {
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
