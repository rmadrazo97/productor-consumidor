const functions = require('firebase-functions');
const express = require("express");
var amqp = require('amqplib/callback_api');
const amqpURl = 'amqp://jfdrdxpr:I9KoAC_Nx1EO_yaVGJ0O79plDcFb-X75@mosquito.rmq.cloudamqp.com/jfdrdxpr';

// ------
let Obj = require('./gen.js');

// ------
const app = express();

// --- function to get characters array based on starting and ending point
function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

// ----------------------------------
// --------- Express Methods --------

app.get("/:letters/:queue", async (req, res) => {
    const letters = req.params.letters;
    const queue = req.params.queue;

    var letras = letters.toUpperCase();

    if (letras.length > 1) {

        arr = genCharArray(letras.slice(0, 1), letras.slice(1, 2));

    } else {

        arr = [letras];

    }

    amqp.connect(amqpURl, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            //var queue = 'hello';
            channel.assertQueue(queue, {
                durable: false
            });
            if (arr.length > 1) {
                arr.forEach(letra => {
                    for (i = 0; i < Obj[letra].length; i++) {
                        channel.sendToQueue(queue, Buffer.from(JSON.stringify(Obj[letra][i]) + ' | '));
                        console.log(" - Sent %s", JSON.stringify(Obj[letra][i]) + ' | ');
                    }
                });

            } else {
                //letra = arr[0];
                for (i = 0; i < Obj[arr[0]].length; i++) {
                    channel.sendToQueue(queue, Buffer.from(JSON.stringify(Obj[arr[0]][i]) + ' | '));
                    console.log(" - Sent %s", JSON.stringify(Obj[letra][i]) + ' | ');
                }
            }


            return null;
        });
        setTimeout(function () {
            connection.close();
            res.status(200).send(JSON.stringify({ received_letters: letters, queue: queue, action: "send via rabitMQ" }));
            process.exit(0);
        }, 100);



    });
})


exports.crawler = functions.https.onRequest(app);

/*
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.crawler = functions.https.onRequest((request, response) => {
    const letters = request.query.letters
    response.send("Crawl Me this letters.");
}); */
