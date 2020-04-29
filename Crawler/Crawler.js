const puppeteer = require('puppeteer');
let jsonData = require('./CrawlerLinks.json');
var fs = require('fs');

let scrape = async (act) => {

    const browser = await puppeteer.launch({ headless: false }); //To see the process of the Crawler.
    const page = await browser.newPage();
    await page.goto(act);       // URL that we want to scrape
    //await page.click('#infinite_arrivals_cont > div:nth-child(1) > div.picture_product_4 > a > img')    //Make click on a specific part of the page
    await page.waitFor(1000);                                       //delay to make sure, everything on page loads

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


//var act = 'https://en.wikipedia.org/wiki/Diahnne_Abbott'

let act = jsonData.A[3]

scrape(act).then((value) => {
    console.log('Result: \n', value);         //Sucess
    console.log('\n Fin del Scraping. \n ');

    const json = JSON.stringify(value)

    fs.writeFile(value.Name + '.json', json, (err) => {
        if (err) {
            console.error(err)
            throw err
        }
        console.log('Saved data to file.')

    });

});
