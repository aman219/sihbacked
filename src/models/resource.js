const { mongoose, Schema } = require('mongoose')

const resouceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, {timestamps: true})

const Resource = mongoose.model("Resource", resouceSchema)

module.exports = { Resource }