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
    budget: {
        type: Number,
        required: true
    },
    resources: [{
        type: Resource.schema
    }],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    reports: [{
        type: String
    }],
    depResponses: [
        new Schema({
            department: {
                type: Schema.Types.ObjectId,
                ref: 'Department',
                unique: true
            },
            accepted: {
                type: Boolean,
                default: false
            },
            response: {
                type: String
            }
        }, { timestamps: true })
    ],
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