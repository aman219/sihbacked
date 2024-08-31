const express = require('express')
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express()

let corsOptions = {
    origin: 'http://localhost:3000',
    // origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
}

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors(corsOptions))

const {router : register} = require('./routes/users')
const {router : employee} = require('./routes/employee')
const {router : resource} = require('./routes/resource')
const {router : department} = require('./routes/department')

app.use("/api/v1/users", register)
app.use("/api/v1/employee", employee)
app.use("/api/v1/resource", resource)
app.use("/api/v1/department", department)

module.exports = { app }