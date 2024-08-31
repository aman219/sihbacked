const { mongoose, Schema } = require('mongoose')

const resouceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    quantity: {
        type: Number,
        default: 0
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    }
}, {timestamps: true})

resouceSchema.index({name: 1, department: 1}, {unique: true})

const Resource = mongoose.model("Resource", resouceSchema)

module.exports = { Resource }