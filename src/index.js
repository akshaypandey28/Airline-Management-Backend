const express = require('express');

const {City} = require('./models/index.js');
const db = require('./models/index.js'); //it will fetch the db object
const {PORT} = require('./config/serverConfig.js');

const setUpAndStartServer = async () =>{

    //create the express object
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    app.listen(PORT, async () => {
        console.log(`Server started at port ${PORT}`);
        await City.create({ //this is promise that's why await
            name: "New Delhi",
        })
    })
}

setUpAndStartServer();