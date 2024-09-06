const { ApiResponse } = require('../utils/ApiResponse')
const { ApiError } = require('../utils/ApiError')
const { asyncHandler } = require('../utils/asyncHandler')
const { Employee } = require('../models/employee')
const jwt = require('jsonwebtoken')
const { Department } = require('../models/department')

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
    const department = await Department.findOne({name: req.body.department})
    if (!department) {
        throw new ApiError(400, "Not getting form data properly, department")
    }
    req.body.department = department._id
    const employee = await Employee.create(req.body)
    if (!employee) {
        throw new ApiError(400, "Not getting form data properly")
    }
    department.employee.push(employee._id)
    await department.save()
    
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
    const isPasswordValid = await employee.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Incorrect password")
    }
    const { accessToken, refreshToken } = await genrateToken(employee._id)
    const loggedInEmployee = await Employee.findById(employee._id).select("-password -refreshToken")
    
    const options = {
        httpOnly: true,
        secure: true
    }

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

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler( async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }
    try {
        const decodeToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        const employee = await Employee.findById(decodeToken._id)
        if (!employee) {
            throw new ApiError(401, "invalid refresh token")
        }
        if (incomingRefreshToken !== employee?.refreshToken) {
            throw new ApiError(401, "refresh token is expired or used")
        }
        const { accessToken, refreshToken } = await genrateToken(employee._id)

        const options = {
            httpOnly: true,
            secure: true
        }
        
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200, 
                { accessToken: accessToken, refreshToken: refreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "invalid refresh token")
    }
})

const getEmployee = asyncHandler( async(req, res) => {
    const employee = await Employee.findById(req.employee._id).select("-password -refreshToken -__v").populate("department", "name")
    if (!employee) {
        throw new ApiError(404, "Employee not found")
    }
    return res.status(200).json(new ApiResponse(200, employee, "Employee found"))
})

const getNotification = asyncHandler( async(req, res) => {
    const notification = await Employee.findById(req.employee._id).populate("notifications").select("notifications")
    if (!notification) {
        throw new ApiError(404, "Notification not found")
    }
    return res.status(200).json(new ApiResponse(200, notification, "Notification found"))
})

module.exports = {
    registerEmployee,
    login,
    logout,
    refreshAccessToken,
    getEmployee,
    getNotification
}