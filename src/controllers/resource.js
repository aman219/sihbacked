const { asyncHandler } = require('../utils/asyncHandler')
const { ApiResponse } = require('../utils/ApiResponse')
const { ApiError } = require('../utils/ApiError')
const { Resource } = require('../models/resource')
const { Department } = require('../models/department')

const addResource = asyncHandler( async(req, res) => {
    const resource = req.body
    const department_id = await Department.findOne({name: resource.department})
    if (!department_id) {
        throw new ApiError(404, "department not found")
    }
    const createdResource = await Resource.create({name: resource.name,
        description: resource.description,
        quantity: resource.quantity,
        department: department_id._id
    })
    if (!createdResource) {
        throw new ApiError(409, "unable to create resource")
    }
    res
    .status(200)
    .json(new ApiResponse(200, createdResource, "resource created successfully"))
})

module.exports = { addResource }