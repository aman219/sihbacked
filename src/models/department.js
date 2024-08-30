const {mongoose, Schema} = require('mongoose')

const departmentSchema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    employee: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    resource : [{
        type: Schema.Types.ObjectId,
        ref: 'Resource',
        quantity: {
            type: Number,
            default: 0
        }
    }]
}, {timestamps: true})

const Department = mongoose.model("Department", departmentSchema);

module.exports = { Department }