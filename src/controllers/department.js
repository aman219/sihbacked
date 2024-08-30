const { asyncHandler } = require('../utils/asyncHandler')
const { ApiResponse } = require('../utils/ApiResponse')
const { ApiError } = require('../utils/ApiError')
const { Department } = require('../models/department')

const addEmployeeToDepartment = async(employee_id, dep) => {
    try {
        const department = await Department.findOne({name: dep})
        department.employee.push(employee_id)
        await department.save();
    } catch (error) {
        throw new ApiError(404, "department not found")
    }
}


const addDepartment = asyncHandler( async(req, res) => {
    const department = await Department.create(req.body)
    if (!department) {
        throw new ApiError(409, "unable to create department")
    }
    res
    .status(200)
    .json(new ApiResponse(200, department, "department created successfully"))
})

module.exports = { addDepartment,
    addEmployeeToDepartment
}