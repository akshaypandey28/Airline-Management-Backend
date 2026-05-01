const {FlightRepository,AirplaneRepository} = require('../repository/index.js');
const {compareTime} = require('../utils/helper.js');

class FlightService{
    constructor(){
        this.flightRepository = new FlightRepository();
        this.airplaneRepository = new AirplaneRepository();
    }

    async createFlight(data){
        try {
            if(!compareTime(data.arrivalTime, data.departureTime)){
                throw {error : "Arrival time should be greater than departure time"};
            }
            
            const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);
            const flight = await this.flightRepository.createFlight({
                ...data,totalSeats:airplane.capacity
            }); //data is object and used spread operator
            return flight;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw error;
        }
    }

    async getFlight(flightId){{
        try {
            const flight = await this.flightRepository.getFlight(flightId);
            return flight;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw error;
        }
    }}
}

module.exports = FlightService;

/**
 * {
 *   flightNumber,
 *   airplaneId ,
 *   departureAirportId,
 *   arrivalAirportId,
 *   arrivalTime,
 *   departureTime,
 *   price
 *   totalSeats -> airplane
 * }
 */