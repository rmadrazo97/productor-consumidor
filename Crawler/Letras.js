const puppeteer = require('puppeteer');


let scrape = async () => {
    const browser = await puppeteer.launch({ //Launch Puppeteer Instance
        headless: false
    });
    const page = await browser.newPage();
    //await page.emulate(iPhone);
    await page.setViewport({
        width: 1400,
        height: 778
    });

    await page.goto("https://en.wikipedia.org/wiki/List_of_American_film_actresses");

    await autoScroll(page);

    const result = await page.evaluate(() => {
        var data = []; // Create an empty array that will store our data
        let elements = document.querySelectorAll('.mw-headline'); // Select all Letters

        for (var element of elements) { // Loop through each letter
            //let letter = document.querySelector('.mw-headline').innerText;
            let letter = element.getAttribute('id');

            data.push({
                letter
            }); // Push an object with the data into our array
        }
        data.splice(-2, 2); //Remove the last 2 elements
        return data; // Return our data array
    });

    browser.close();
    return result; // Return the data
};

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 50;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}


/*
links.forEach(function(values) {
    console.log(values);
    scrape(values).then((value) => {
        console.log('\n Productos Electonicos:\n ');
        console.log(value); // Success!
        console.log('\n Fin del Scraping. \n ');
    });
    
});
*/

scrape().then((value) => {
    console.log('\n Productos Electonicos:\n ');
    console.log(value); // Success!
    console.log('\n Fin del Scraping. \n ');
});