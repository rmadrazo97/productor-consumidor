fs = require('fs');

let A = require('./newData/A.json');
let B = require('./newData/B.json');
let C = require('./newData/C.json');
let D = require('./newData/D.json');
let E = require('./newData/E.json');
let F = require('./newData/F.json');
let G = require('./newData/G.json');
let H = require('./newData/H.json');
let I = require('./newData/I.json');
let J = require('./newData/J.json');
let K = require('./newData/K.json');
let L = require('./newData/L.json');
let M = require('./newData/M.json');
let N = require('./newData/N.json');
let O = require('./newData/O.json');
let P = require('./newData/P.json');
let Q = require('./newData/Q.json');
let R = require('./newData/R.json');
let S = require('./newData/S.json');
let T = require('./newData/T.json');
let U = require('./newData/U.json');
let V = require('./newData/V.json');
let W = require('./newData/W.json');
let X = require('./newData/X.json');
let Y = require('./newData/Y.json');
let Z = require('./newData/Z.json');


// some JS object for testing
const Dict = {
    A: A,
    B: B,
    C: C,
    D: D,
    E: E,
    F: F,
    G: G,
    H: H,
    I: I,
    J: J,
    K: K,
    L: L,
    M: M,
    N: N,
    O: O,
    P: P,
    Q: Q,
    R: R,
    S: S,
    T: T,
    U: U,
    V: V,
    W: W,
    X: X,
    Y: Y,
    Z: Z,
}

// fs is a module of nodejs to interact with file system
// we specify the file name and the stringified JSON object
// as well as a callback to handle a possible error
fs.writeFile('./newData/dict.json', JSON.stringify(Dict), (err) => {
    if (err) throw err
    console.log('The file has been saved!')
})