const {mongoose, Schema} = require('mongoose')

const departmentSchema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})

const Department = mongoose.model("Department", departmentSchema);

module.exports = { Department }