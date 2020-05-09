const puppeteer = require('puppeteer');
let jsonData = require('./CrawlerLinks.json');
var fs = require('fs');


let scrape = async (urls) => {

    datass = []


    for (let i = 0; i < urls.length; i++) {

        //const url = urls[i];
        var Name, temp, temp2, Letra, Role, films;

        const browser = await puppeteer.launch({ headless: true }); //To see the process of the Crawler.
        const page = await browser.newPage();
        await page.goto(`${urls[i]}`, { waitUntil: 'networkidle2' });       // URL that we want to scrape
        //await page.click('#infinite_arrivals_cont > div:nth-child(1) > div.picture_product_4 > a > img')    //Make click on a specific part of the page


        const result = await page.evaluate(() => {

            let url = location.href;
            if (document.querySelector('.fn')) {
                Name = document.querySelector('.fn').innerText;
                temp = Name.split(/\s+/);
                temp2 = temp[temp.length - 1]
                Letra = temp2.charAt(0)
            } else {
                Name = 'Hola Mundo';
                Letra = "@"
            }
            if (document.querySelector('.role')) {
                Role = document.querySelector('.role').innerText;
            } else {
                Role = "First Character";
            }
            if (document.querySelectorAll(".wikitable a")) {
                films = Array.from(document.querySelectorAll(".wikitable a")).map(anchor => [anchor.href, anchor.textContent]);

            } else {
                films = ['hola', 'mundo'];
            }

            return {
                url,
                Name,
                Role,
                Letra,
                films
            }

        });

        datass.push({
            result
        })


        await browser.close();
    }

    //Scrape
    return datass;

};


//var act = 'https://en.wikipedia.org/wiki/Diahnne_Abbott'

let act = jsonData.A

scrape(act).then((value) => {
    console.log('Result: \n', value);         //Sucess
    console.log('\n Fin del Scraping. \n ');

    const json = JSON.stringify(value)

    fs.writeFile('noselaverdad.json', json, (err) => {
        if (err) {
            console.error(err)
            throw err
        }
        console.log('Saved data to file.')
    });

});