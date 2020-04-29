let jsonData = require('./Links.json');
var fs = require('fs');


//var temp = jsonData[5]
//var newl = temp.alm
//var newStr = newl.substring(0, newl.length - 2);


let letras = []

for (i = 0; i < jsonData.length; i++) {


    var temp = jsonData[i]
    var newl = temp.alm.slice(-1)

    letras.indexOf(newl) === -1 ? letras.push(newl) : console.log("This letter already exists");

}

//console.log(letras)



var LinksDict = {}


for (i = 0; i < letras.length; i++) {

    LinksDict[letras[i]] = new Array();

}


for (i = 0; i < jsonData.length; i++) {


    var temp = jsonData[i]
    var url = temp.alm
    var newUrl = url.substring(0, url.length - 2);
    var newl = temp.alm.slice(-1)

    if (newl == 'A') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'B') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'C') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'D') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'E') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'F') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'G') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'H') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'I') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'J') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'K') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'L') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'M') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'N') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'O') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'P') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'Q') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'S') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'T') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'U') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'V') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'W') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'Y') {
        LinksDict[newl].push(newUrl);
    } else if (newl == 'Z') {
        LinksDict[newl].push(newUrl);
    }

}

//console.log(LinksDict)

const json = JSON.stringify(LinksDict)


fs.writeFile("./CrawlerLinks.json", json, (err) => {
    if (err) {
        console.error(err)
        throw err
    }
    console.log('Saved data to file.')

});

