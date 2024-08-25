const mongoose = require('mongoose')
const { Employee } = require('../models/employee')
const { Department } = require('../models/department')

const dBConnect = async()=> {
    try {
        const dBConnection = await mongoose.connect(process.env.DATABASE_URL);
        console.log(`Connected : ${dBConnection.connection.host}`);
    } catch (error) {
        throw error;
    }
}

module.exports = { dBConnect }