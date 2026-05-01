const {Flights} = require('../models/index.js');

class FlightRepository{
    async createFlight(data){ //data is object
        try {
           const flight = await Flights.create(data); //create is inbuilt method of sequelize which will create a new entry in database
           return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

    async getFlight(flightId){
        try {
            const flight = await Flights.findByPk(flightId);
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

}

module.exports = FlightRepository;