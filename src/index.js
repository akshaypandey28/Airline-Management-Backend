const express = require('express');

const {PORT} = require('./config/serverConfig.js');

const ApiRoutes = require('./routes/index.js'); //ApiRoutes is a router

const setUpAndStartServer = async () =>{

    //create the express object
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    app.use('/api',ApiRoutes); 

    app.listen(PORT, async () => {
        console.log(`Server started at port ${PORT}`);
    })
}

setUpAndStartServer();