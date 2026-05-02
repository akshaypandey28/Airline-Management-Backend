const express = require('express');

const router = express.Router();

const v1ApiRoute = require('./v1/index.js'); //v1ApiRoute is a router

router.use('/v1',v1ApiRoute); //all routes in v1ApiRoute will be prefixed with /v1

module.exports = router;