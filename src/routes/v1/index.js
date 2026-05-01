const express = require('express');
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
router.post('/flights',FlightController.create);
router.get('/flights',FlightController.getAll);
module.exports = router;

//for airports
router.post('/airports',AirportController.create);