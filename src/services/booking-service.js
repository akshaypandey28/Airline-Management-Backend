const axios = require('axios');

const { BookingRepository } = require('../repository/index.js');

const { FLIGHTS_SERVICE_PATH } = require('../config/serverConfig.js');
const {ServiceError} = require('../utils/errors/index.js');

class BookingService {
    constructor(){
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data){
        try {
            const flightId = data.flightId;

            let getFlightRequestURL = `${FLIGHTS_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const flight = await axios.get(getFlightRequestURL); //this will give the flight details from the flight service

            const flightData = flight.data.data;

            let priceOfTheFlight = flightData.price;

            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError('Something went wrong in the booking process', 'Insufficient seats in the flight');
            }

            const totalCost = priceOfTheFlight * data.noOfSeats;

            const bookingPayload = {...data, totalCost};

            const booking = await this.bookingRepository.create(bookingPayload);

            const updateFlightRequestURL = `${FLIGHTS_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;

            console.log(updateFlightRequestURL);

            await axios.patch(updateFlightRequestURL, {totalSeats: flightData.totalSeats - booking.noOfSeats});

            const finalBooking = await this.bookingRepository.update(booking.id, {status: "Booked"});

            return finalBooking;
        } catch (error) {
            console.log(error);
            if(error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error; //if the error is coming from the repository layer or if it is a validation
                // error, we will throw the same error to the controller layer
            }
            throw new ServiceError();
        }
    }
}

module.exports = BookingService;