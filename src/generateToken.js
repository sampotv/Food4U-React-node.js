const jwt = require("jsonwebtoken") 
let jwtSecretKey = null;

  jwtSecretKey = require('./jwt-key.json').secret;

function generateToken (user) {
 
    jwt.sign(user, jwtSecretKey, {expiresIn: "1h"})

   

}
module.exports=generateToken


