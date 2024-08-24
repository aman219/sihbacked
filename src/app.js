const express = require('express')
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express()

let corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
}

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors(corsOptions))

const {router : register} = require('./routes/users')

app.use("/api/v1/users/", register)

module.exports = { app }