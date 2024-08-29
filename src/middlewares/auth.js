const { asyncHandler } = require('../utils/asyncHandler')
const { ApiError } = require('../utils/ApiError')
const { jwt } = require('jsonwebtoken')
const { Employee } = require('../models/employee')

const auth = asyncHandler( async(req, res, next) => {
try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "invalid or not login")
        }
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const employee = await Employee.findById(decodeToken._id).select("-password, -refreshToken")
        if (!employee) {
            throw new ApiError(401, "Invalid access token")
        }
        req.employee = employee
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})

module.exports = { auth }