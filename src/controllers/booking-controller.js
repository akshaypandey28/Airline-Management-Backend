const { StatusCodes } = require('http-status-codes');

const { BookingService } = require('../services/index.js');

const {createChannel, publishMessage} = require('../utils/messageQueue.js');

const {REMINDER_BINDING_KEY} = require('../config/serverConfig.js');
const services = require('../services/index.js');
const bookingService = new BookingService();

class BookingController {

    constructor(){
    }

    async sendMessageToQueue(req,res) {
        const channel = await createChannel();

        const payload = {
            data:{
                subject: "This is a noti from queue",
                content: "some queue will subscribe this",
                recepientEmail: "akshaynitp29@gmail.com",
                notificationTime: "2026-05-06 19:14:05"
            },
            service: "CREATE_TICKET"
        };

        publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload));

        return res.status(200).json({
            message: 'Succesfully published the event'
        });
    }

    async create(req, res) {
        try {
            const response = await bookingService.createBooking(req.body);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully completed booking',
                success: true,
                err: {},
                data: response
            });
        } catch (error) {
            return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                success: false,
                err: error.explanation,
                data: {}
            });
        }
    }
}

module.exports = BookingController;