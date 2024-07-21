const util = require('util');
const jwtCallback = require('jsonwebtoken');

const jwt = {
    sign: util.promisify(jwtCallback.sign),
    verify: util.promisify(jwtCallback.verify)
 };

 module.exports = jwt;



 
// promise function with callback === util.promisify()

//  function promiseSin(payload, secret, options) {
//     const promise = new Promise(function(resolve, reject){
//         jwtCallback.sign(payload, secret, options, (err, token) =>{
//             if(err){
//                 return reject(err);
//             }
//             resolve(token);
//         });
//     });
//     return promise;
//  }