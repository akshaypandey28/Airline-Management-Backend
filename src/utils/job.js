const cron = require('node-cron');

const emailService = require('../services/email-service.js');

const sender = require('../config/emailConfig');

/**
 * 10:00 am 
 * Every 5 minutes
 * We will check are their any pending emails which was expected to be sent 
 * by now  and is pending
 */

const setUpJobs = () => {
    cron.schedule('*/5 * * * *', async () => {
        console.log("Checking for pending emails which are expected to be sent by now");

        const response = await emailService.fetchPendingEmails(); //it's an array of pending email tickets
        response.forEach((email) => {

            sender.sendMail({  //sendMail give two things first a parameter and second is a callback function
                to: email.recepientEmail,
                subject: email.subject,
                text: email.content
            }, //this is the parameter

            async (err, data) => { // this is the callback function
                if(err) {
                    console.log(err);
                } else {
                    console.log(data);
                    await emailService.updateTicket(email.id, {status: "SUCCESS"});
                }
            }); 
        });
        console.log(response);
    });
}

module.exports = setUpJobs;