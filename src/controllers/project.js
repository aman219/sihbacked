const { asyncHandler } = require('../utils/asyncHandler')
const { ApiError } = require('../utils/ApiError')
const { ApiResponse } = require('../utils/ApiResponse')
const { Project } = require('../models/project')
const { Employee, Notification } = require('../models/employee')
const { Department } = require('../models/department')
const { departmentPriority } = require('../constants')

const addPorject = asyncHandler(async (req, res) => {
    const project = req.body
    project.createdBy = req.employee.department
    const newProject = await Project.create(project)
    if (!newProject) {
        throw new ApiError(400, 'Project not created')
    }
    const emps = await Employee.find()
    const noti = {
        message: project.description,
        project: newProject._id,
        read: false
    }
    const notifications = await Notification.create(noti)
    for (let emp of emps) {
        emp.notifications.push(notifications._id);
        await emp.save()
    }

    return res
    .status(200)
    .json(new ApiResponse(200, newProject, 'Project created successfully', project))
})

const addResponse = asyncHandler(async (req, res) => {
    const depRes = req.body
    const project = await Project.findById(depRes.project)
    if (!project) {
        throw new ApiError(400, 'Project not found')
    }
    for (let res of project.depResponses) {
        if (res.department.equals(req.employee.department)) {
            throw new ApiError(409, "Response already exist")
        }
    }
    const response = {
        department: req.employee.department,
        response: depRes.response,
        accepted: depRes.accepted
    }
    project.depResponses.push(response)
    await project.save()
    let arr = new Array(8)
    for (let resp of project.depResponses) {
        const department = await Department.findById(req.employee.department).select("name")
        console.log(department.name)
        arr[departmentPriority[department.name]] = resp
    }
    for (let i=0; i<8; i++) {
        if (arr[i] === undefined) {
            i = 8;
        }
        if (arr[i].accepted) {
            await Project.updateOne(
                { _id: project._id },
                { $set: { department: arr[i]._id } }
            )
            i = 8;
        }
    }
    console.log(project.department)
    return res
    .status(200)
    .json(new ApiResponse(200, project, 'Response added successfully'))
})

module.exports = { addPorject,
    addResponse
 }