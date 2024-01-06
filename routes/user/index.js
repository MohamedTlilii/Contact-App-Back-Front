const expres = require("express");
const route = expres.Router();

route.post("/register",require("./register") )
route.post("/login",require("./login") )




module.exports = route;
