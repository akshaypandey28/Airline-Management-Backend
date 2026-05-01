const express = require('express');

const {PORT} = require('./config/serverConfig.js');

const ApiRoutes = require('./routes/index.js'); //ApiRoutes is a router
const db = require('./models/index.js');
const setUpAndStartServer = async () =>{

    //create the express object
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    app.use('/api',ApiRoutes); 

    app.listen(PORT, async () => {
        console.log(`Server started at port ${PORT}`); 

        if(process.env.SYNC_DB){
            db.sequelize.sync(); //it will create tables in database if they are not created already and alter:true will update the tables if there is any change in model
        }
    })
}

setUpAndStartServer();