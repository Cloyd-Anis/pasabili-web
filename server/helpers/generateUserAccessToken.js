require('dotenv').config("./.env");
const jwt = require('jsonwebtoken');


exports.generateUserAccessToken = (user) =>{
    return jwt.sign({user_id: JSON.stringify(user)},process.env.ACCESS_TOKEN_SECRET)
}