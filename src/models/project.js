const { mongoose, Schema } = require('mongoose')
const { Resource } = require('./resource')

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    resources: [{
        type: Resource.schema
    }],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    reports: [{
        type: String
    }],
    location: {
        type: String,
        required: true
    },
    staff: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }
}, { timestamps: true})

const Project = mongoose.model("Project", projectSchema)

module.exports = { Project }