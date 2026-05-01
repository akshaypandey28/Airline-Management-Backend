const { create } = require('../controllers/city-controller');
const {Airplane} = require('../models/index.js');

class AirplaneRepository {
    async getAirplane(id) { //id is coming via req.params from controller so flow => controller -> service -> repository
        try {
            const airplane = await Airplane.findByPk(id);
            return airplane;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }
}

module.exports = AirplaneRepository;