const {Flights} = require('../models/index.js');
const { Op } = require('sequelize');

class FlightRepository{

    #createFilter(data) {
        let filter = {};
        if(data.arrivalAirportId) {
            filter.arrivalAirportId = data.arrivalAirportId;
        }
        if(data.departureAirportId) {
            filter.departureAirportId = data.departureAirportId;
        }

        // if(data.minPrice && data.maxPrice) {
        //     Object.assign(filter, {
        //         [Op.and]: [
        //             { price: {[Op.lte]: data.maxPrice} }, 
        //             { price: {[Op.gte]: data.minPrice} }
        //         ]
        //     })
        // }
        let priceFilter = [];
        if(data.minPrice) {
            // Object.assign(filter, {price: {[Op.gte]: data.minPrice}});
            priceFilter.push({price: {[Op.gte]: data.minPrice}});
        }
        if(data.maxPrice) {
            // Object.assign(filter, {price: {[Op.lte]: data.maxPrice}});
            priceFilter.push({price: {[Op.lte]: data.maxPrice}});
        }
        Object.assign(filter, {[Op.and]: priceFilter});
        // Object.assign(filter, {[Op.and]: [{ price: {[Op.lte]: 7000} }, { price: {[Op.gte]: 4000} }]})
        console.log("DATA OF FILTER OBJECT  ------------- ",filter);
        return filter;
    }

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

    async getAllFlights(filter){
        try {
            const filterObject = this.#createFilter(filter);
            const flight = await Flights.findAll({
                where: filterObject
            });
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

    async updateFlights(flightId, data) {
        try {
            const flight = await Flights.findByPk(flightId);
            if (!flight) {
                throw new Error("Flight not found");
            }

            Object.keys(data).forEach(key => {
                flight[key] = data[key];
            });
            
            await flight.save();
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

}

module.exports = FlightRepository;