const { asyncHandler } = require('../utils/asyncHandler')
const { ApiResponse } = require('../utils/ApiResponse')
const { ApiError } = require('../utils/ApiError')
const { Resource } = require('../models/resource')

const addResource = asyncHandler( async(req, res) => {
    const resource = req.body
    const createdResource = await Resource.create(resource)
    if (!createdResource) {
        throw new ApiError(409, "unable to create resource")
    }
    res
    .status(200)
    .json(new ApiResponse(200, createdResource, "resource created successfully"))
})

module.exports = { addResource }