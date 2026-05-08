const express = require('express');

const router = express.Router();

const v1ApiRoute = require('./v1/index.js'); //v1ApiRoute is a router

router.use('/v1' , v1ApiRoute);

module.exports = router;