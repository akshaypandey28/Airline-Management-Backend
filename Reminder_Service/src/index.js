const express = require('express');

const { PORT } = require('./config/serverConfig.js');

const EmailService = require('./services/email-service.js')
const {createChannel,subscribeMessage} = require('./utils/messageQueue.js')
const jobs = require('./utils/job.js');
const {REMINDER_BINDING_KEY} = require('./config/serverConfig.js');

const ApiRoutes = require('./routes/index.js'); //ApiRoutes is a router

const setupAndStartServer = async () => {
    const app = express();

    app.use(express.json());

    app.use(express.urlencoded({extended: true}));

    app.use('/api',ApiRoutes); 

    const channel = await createChannel();

    subscribeMessage(channel,EmailService.subscribeEvents,REMINDER_BINDING_KEY);

    
    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
        //jobs();
    });
}

setupAndStartServer();