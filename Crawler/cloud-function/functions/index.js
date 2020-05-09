const functions = require('firebase-functions');
let Adata = require('./data/a.json');

const express = require("express");
var amqp = require('amqplib/callback_api');
const amqpURl = 'amqp://jfdrdxpr:I9KoAC_Nx1EO_yaVGJ0O79plDcFb-X75@mosquito.rmq.cloudamqp.com/jfdrdxpr';

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

app.get("/:letters", async (req, res) => {
    const letters = req.params.letters;
    var msg = '';

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

            var queue = 'hello';
            //msg = Adata;
            //msg = JSON.stringify(Adata);

            for (i = 0; i < Adata.length; i++) {
                channel.assertQueue(queue, {
                    durable: false
                });
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(Adata[i])));
                console.log(" [x] Sent %s", msg);
            }

            return null;
        });
        setTimeout(function () {
            connection.close();
            process.exit(0);
        }, 500);
        res.status(200).send(JSON.stringify({ received_letters: letters, action: "send via rabitMQ" }));


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
