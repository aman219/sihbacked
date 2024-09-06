const {mongoose, Schema} = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const notificationSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Notification = mongoose.model("Notification", notificationSchema)

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
    phoneNumber : {
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
    refreshToken : {
        type: String
    },
    profilePhoto : {
        type: String
    },
    notifications : [{
        type: Schema.Types.ObjectId,
        ref: 'Notification'
    }],
    role : {
        type: String,
        required: true
    },
    department : {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    }

}, {timestamps: true})

employeeSchema.pre("save", async function (next){
    if (!this.isModified("password")) return next();
    
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

employeeSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

employeeSchema.methods.genrateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        email: this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

employeeSchema.methods.genrateRefreshToken = function() {
    return jwt.sign({
        _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

const Employee = mongoose.model("Employee", employeeSchema)


module.exports = { Employee, Notification }