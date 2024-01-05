const expres = require("express");
const route = expres.Router();

route.post("/register",require("./register") )




module.exports = route;
