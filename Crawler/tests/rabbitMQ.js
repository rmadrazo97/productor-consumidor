#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
const amqpURl = 'amqp://jfdrdxpr:I9KoAC_Nx1EO_yaVGJ0O79plDcFb-X75@mosquito.rmq.cloudamqp.com/jfdrdxpr';

amqp.connect(amqpURl, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';
        var msg = 'Hello World!';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
});