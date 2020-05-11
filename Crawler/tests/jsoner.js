var amqp = require('amqplib/callback_api');
const amqpURl = 'amqp://jfdrdxpr:I9KoAC_Nx1EO_yaVGJ0O79plDcFb-X75@mosquito.rmq.cloudamqp.com/jfdrdxpr';

let Obj = require('./gen.js');
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

function returner(letters, queue_in) {
    var msg = '';
    var queue = queue_in;

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
            /*
            if (arr.length > 1) {
                arr.forEach(letra => {
                    channel.sendToQueue(queue, Buffer.from(JSON.stringify(Obj[letra])));
                    console.log("\n \n Sent %s", JSON.stringify(Obj[letra]));

                });

            } else {
                //letra = arr[0];
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(Obj[arr[0]])));
            } */


            if (arr.length > 1) {
                arr.forEach(letra => {
                    for (i = 0; i < Obj[letra].length; i++) {
                        channel.sendToQueue(queue, Buffer.from(JSON.stringify(Obj[letra][i])));
                        console.log(" - Sent %s", JSON.stringify(Obj[letra][i]) + ' | ');
                    }
                });

            } else {
                //letra = arr[0];
                for (i = 0; i < Obj[arr[0]].length; i++) {
                    channel.sendToQueue(queue, Buffer.from(JSON.stringify(Obj[arr[0]][i])));
                    console.log(" - Sent %s", JSON.stringify(Obj[letra][i]) + ' | ');
                }
            }


            /*
            for (i = 0; i < Adata.length; i++) {
                channel.assertQueue(queue, {
                    durable: false
                });
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(A[i])));
                console.log(" [x] Sent %s", msg);
            } */

            return null;
        });
        setTimeout(function () {
            connection.close();
            process.exit(0);
        }, 500);
        console.log(JSON.stringify({ received_letters: letters, queue: queue, action: "send via rabitMQ" }));


    });
}

returner('ad', 'hello');

