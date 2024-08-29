const { ApiResponse } = require('../utils/ApiResponse')
const { ApiError } = require('../utils/ApiError')
const { asyncHandler } = require('../utils/asyncHandler')
const { Employee } = require('../models/employee')

const genrateToken = async (userId) => {
    try {
        const employee = Employee.findById(userId)
        const accessToken = employee.genreateAccessToken()
        const refreshToken = employee.genrateRefreshToken()
        employee.refreshToken = refreshToken
        await employee.save();
        return {accessToken, refreshToken}
        
    } catch (error) {
        console.log(`Something went wrong while genrating token : ${error}`)
    }
}

const registerEmployee = asyncHandler( async(req, res) => {
    console.log(req.body)
    const employee = req.body
    if (!employee) {
        throw new ApiError(400, "Not getting form data properly")
    }
    return res.status(200).json(
        new ApiResponse(200, employee, "Employee created successfully")
    )
})

module.exports = {
    registerEmployee
}