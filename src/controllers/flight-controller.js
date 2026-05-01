const {FlightService} = require('../services/index.js');

const flightService = new FlightService();

const create = async(req,res) => {
    try {
        const flight = await flightService.createFlight(req.body);
        res.status(200).json({
            data:flight,
            success:true,
            message: 'Successfully created a flight',
            err:{}
        })
    } catch (error) {
        console.log(error);
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to create a flight',
            err: error
        });
    }
}

const get = async(req,res) => {
    try {
        const response = await flightService.getFlight(req.params.id);
        return res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            err: {},
            message: 'Successfully fetched the flight'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to fetch the flight',
            err: error
        });
    }
}

module.exports = {
    create,
    get
}