const puppeteer = require('puppeteer');

let scrape = async () => {

    const browser = await puppeteer.launch({ headless: false }); //To see the process of the Crawler.
    const page = await browser.newPage();
    await page.goto('https://en.wikipedia.org/wiki/Beverly_Aadland');       // URL that we want to scrape
    //await page.click('#infinite_arrivals_cont > div:nth-child(1) > div.picture_product_4 > a > img')    //Make click on a specific part of the page
    await page.waitFor(1000);                                       //delay to make sure, everything on page loads

    const result = await page.evaluate(() => {

        let url = location.href;                                     // get the URL of the actor
        let Name = document.querySelector('.fn').innerText;          // get the Name of the actor 
        let Role = document.querySelector('.role').innerText;        // Get the role of the actor
        let temp = Name.split(/\s+/);                                // Split the actor's name 
        let temp2 = temp[temp.length - 1]                            // Get the last item of the Name
        let Letra = temp2.charAt(0)                                  // Get the first char of the actor

        return {
            url,
            Name,
            Role,
            Letra,
        }
    });

    //Scrape

    browser.close();
    return result;

};

scrape().then((value) => {
    console.log('Result: \n', value);         //Sucess
});
