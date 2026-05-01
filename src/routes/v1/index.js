const express = require('express');

const { FlightMiddlewares } = require('../../middlewares/index.js');
const CityController = require('../../controllers/city-controller.js');
const FlightController = require('../../controllers/flight-controller.js');
const AirportController = require('../../controllers/airport-controller.js');

const router = express.Router();

//for cities
router.post('/city',CityController.create);
router.delete('/city/:id', CityController.destroy);
router.get('/city/:id', CityController.get);
router.patch('/city/:id', CityController.update);
router.get('/city', CityController.getAll);

//for flights
router.post(
    '/flights', 
    FlightMiddlewares.validateCreateFlight, 
    FlightController.create
);
router.get('/flights',FlightController.getAll);
router.get('/flights/:id', FlightController.get);
//router.patch('/flights/:id', FlightController.update);

//for airports
router.post('/airports',AirportController.create);


module.exports = router;