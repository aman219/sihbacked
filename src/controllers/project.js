const { asyncHandler } = require('../utils/asyncHandler')
const { ApiError } = require('../utils/ApiError')
const { ApiResponse } = require('../utils/ApiResponse')
const { Project } = require('../models/project')
const { Resource } = require('../models/resource')

const addPorject = asyncHandler(async (req, res, next) => {
    const project = req.body
    project.resources = await Resource.findOne({name: req.body.resources})
    if (!project.resources) {
        throw new ApiError(400, 'Resource not found')
    }
    const newProject = await Project.create(project)
    if (!newProject) {
        throw new ApiError(400, 'Project not created')
    }
    return res
    .status(200)
    .json(new ApiResponse(200, newProject, 'Project created successfully', project))
})

module.exports = { addPorject }