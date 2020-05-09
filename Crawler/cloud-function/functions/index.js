const functions = require('firebase-functions');
const puppeteer = require('puppeteer');
let jsonData = require('./CrawlerLinks.json');
const express = require("express");

const app = express();

let scrape = async (act) => {

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
    }); //To see the process of the Crawler.
    const page = await browser.newPage();
    await page.goto(act);       // URL that we want to scrape
    //await page.click('#infinite_arrivals_cont > div:nth-child(1) > div.picture_product_4 > a > img')    //Make click on a specific part of the page
    await page.waitFor(700);                                       //delay to make sure, everything on page loads

    const result = await page.evaluate(() => {

        let url = location.href;
        let Name = document.querySelector('.fn').innerText;
        let Role = document.querySelector('.role').innerText;
        let temp = Name.split(/\s+/);
        let temp2 = temp[temp.length - 1]
        let Letra = temp2.charAt(0)
        let films = Array.from(document.querySelectorAll(".wikitable a")).map(anchor => [anchor.href, anchor.textContent])
        return {
            url,
            Name,
            Role,
            Letra,
            films
        }



    });


    //Scrape

    browser.close();
    return result;

};

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

    var letras = letters.toUpperCase();

    if (letras.length > 1) {

        arr = genCharArray(letras.slice(0, 1), letras.slice(1, 2));

    } else {
        
        arr = [letras];

    }


    scrape("https://en.wikipedia.org/wiki/Beverly_Aadland").then((value) => {
        //to_return = value;
        const json = JSON.stringify(value);
        console.log(json);
        res.status(200).send(JSON.stringify({ in_letters: letters, values: value, stupid: 'yes' }));
        return null;
    }).catch((err) => {
        console.log('Error:', err)
    });

    //res.status(200).send(JSON.stringify({ in_letters: letters, values: to_return, stupid: 'yes' }));
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
