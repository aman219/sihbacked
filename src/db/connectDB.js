const mongoose = require('mongoose')
const { Employee } = require('../models/employee')
const { Department } = require('../models/department')

const dBConnect = async()=> {
    try {
        const dBConnection = await mongoose.connect(process.env.DATABASE_URL);
        console.log(`Connected : ${dBConnection.connection.host}`);
        const employee = await Employee.findById('66cb487c138ca59408311259')
        console.log(employee);
        const department = await Department.findById(employee.department);
        console.log(department)
        
    } catch (error) {
        throw error;
    }
}

module.exports = { dBConnect }