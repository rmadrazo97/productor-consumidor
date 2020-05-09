const As = require('./data/As.json');

console.log(As.length);
for (i = 0; i < As.length; i++) {
    console.log('\n Viene \n', JSON.stringify(As[i]));
}