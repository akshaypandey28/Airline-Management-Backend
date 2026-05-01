const CrudRespository = require('./crud-repository.js');
const { Airport } = require('../models/index.js');

class AirportRespository extends CrudRespository {
    constructor() {
        super(Airport);
    }
}

module.exports = AirportRespository;