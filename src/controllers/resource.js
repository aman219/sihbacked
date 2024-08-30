const { asyncHandler } = require('../utils/asyncHandler')
const { ApiResponse } = require('../utils/ApiResponse')
const { ApiError } = require('../utils/ApiError')
const { Resource } = require('../models/resource')
const { addResourceToDepartment } = require('./department')

const addResource = asyncHandler( async(req, res) => {
    const resource = req.body
    const createdResource = await Resource.create({name: resource.name,
        description: resource.description,
        quantity: resource.quantity
    })
    if (!createdResource) {
        throw new ApiError(409, "unable to create resource")
    }
    await addResourceToDepartment(createdResource._id, resource.department)
    res
    .status(200)
    .json(new ApiResponse(200, createdResource, "resource created successfully"))
})

module.exports = { addResource }