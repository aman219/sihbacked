const { asyncHandler } = require('../utils/asyncHandler')
const { ApiResponse } = require('../utils/ApiResponse')

const register = asyncHandler(async(req, res)=>{
    return res.status(201).json(new ApiResponse(200, {"user": "Aman Patel"}, "User Registered"))
})

module.exports = { register }