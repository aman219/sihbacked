const { ApiResponse } = require('../utils/ApiResponse')
const { ApiError } = require('../utils/ApiError')
const { asyncHandler } = require('../utils/asyncHandler')
const { Employee } = require('../models/employee')
const { options } = require('../constants')

const genrateToken = async (userId) => {
    try {
        const employee = await Employee.findById(userId)
        const accessToken = employee.genrateAccessToken()
        const refreshToken = employee.genrateRefreshToken()
        employee.refreshToken = refreshToken
        await employee.save({ validateBeforeSave: false })
        return {accessToken, refreshToken}
        
    } catch (error) {
        console.log(`Something went wrong while genrating token : ${error}`)
    }
}

const registerEmployee = asyncHandler( async(req, res) => {
    req.body.profilePhoto = req.file?.path || "public/temp/default.jpg"
    req.body.department = '66cb20aa7fe57a5e27f960b9';
    const employee = await Employee.create(req.body);
    if (!employee) {
        throw new ApiError(400, "Not getting form data properly")
    }
    return res.status(200).json(
        new ApiResponse(200, employee, "Employee created successfully")
    )
})

const login = asyncHandler( async(req, res) => {
    const { email, password } = req.body
    const employee = await Employee.findOne({email: email})
    if (!employee) {
        throw new ApiError(404, "Email not found")
    }
    const isPasswordValid = await employee.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Incorrect password")
    }
    const { accessToken, refreshToken } = await genrateToken(employee._id)
    const loggedInEmployee = await Employee.findById(employee._id).select("-password -refreshToken")
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInEmployee, 
                accessToken: accessToken, 
                refreshToken: refreshToken
            },
            "User logged In Successfully"
        )
    )
})

const logout = asyncHandler( async(req, res) => {
    await Employee.findByIdAndUpdate(
        req.employee._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

module.exports = {
    registerEmployee,
    login,
    logout
}