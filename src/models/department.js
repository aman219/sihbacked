const {mongoose, Schema} = require('mongoose')

const departmentSchema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    employee: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }]
}, {timestamps: true})

const Department = mongoose.model("Department", departmentSchema);

module.exports = { Department }