const puppeteer = require('puppeteer');
var fs = require('fs');

var alm = []

let scrape = async () => {

    const browser = await puppeteer.launch({ headless: false }); //To see the process of the Crawler.
    const page = await browser.newPage();
    await page.goto('https://en.wikipedia.org/wiki/List_of_American_film_actresses');       // URL that we want to scrape
    //await page.click('#infinite_arrivals_cont > div:nth-child(1) > div.picture_product_4 > a > img')    //Make click on a specific part of the page
    await page.waitFor(1000);                                       //delay to make sure, everything on page loads

    const result = await page.evaluate(() => {

        //let Name = (document.querySelectorAll("a")).map(anchor => [anchor.href, anchor.textContent]);

        let data = [];

        let links = Array.from(document.querySelectorAll(".div-col.columns.column-width a")).map(anchor => [anchor.href, anchor.textContent])
        var keysList = Object.values(links);

        for (i = 0; i < keysList.length; i++) {

            var tempo = keysList[i][1]
            let temp = tempo.split(/\s+/);
            let temp2 = temp[temp.length - 1]
            let Letra = temp2.charAt(0)
            let alm = keysList[i][0] + " " + Letra

            data.push({
                alm

            })

        }


        return {
            data
        }
    });

    //Scrape

    browser.close();
    return result;

};

scrape().then((value) => {
    console.log('Result: \n', value);         //Sucess
    console.log('\n Fin del Scraping. \n ');
});
