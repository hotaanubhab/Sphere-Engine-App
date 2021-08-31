require('dotenv').config();
var MONGO_URI = process.env.MONGO_URI;
var PROBLEMS_API = process.env.PROBLEMS_API;
var ACCESS_TOKEN = process.env.ACCESS_TOKEN;

module.exports = {
MONGO_URI,
PROBLEMS_API,
ACCESS_TOKEN
}