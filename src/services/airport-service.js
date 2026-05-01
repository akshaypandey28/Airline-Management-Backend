const CrudService = require('./crud-service.js');
const { AirportRespository } = require('../repository/index.js');

class AirportService extends CrudService {
    constructor() {
        const airportRespository = new AirportRespository();
        super(airportRespository);
    }
}

module.exports = AirportService;