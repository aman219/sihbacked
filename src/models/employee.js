const {mongoose, Schema} = require('mongoose')
// const { Department } = reuqire('./department')

const employeeSchema = new Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String
    },
    dateOfBirth : {
        type: Date,
        required: true
    },
    dateOfJoining : {
        type: Date,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    mobileNumber : {
        type: String,
        unique: true
    },
    gender : {
        type: String,
        enum: ["male", "female"]
    },
    password : {
        type: String,
        required: true
    },
    prfilePhoto : {
        type: String
    },
    role : {
        type: String,
        required: true
    },
    department : {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    }

}, {timestamps: true})

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = { Employee }