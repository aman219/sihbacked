
const asyncHandler = (requestHandler) => {
    try {
        return async(req, res, next) => {
            return await requestHandler(req, res, next);
        }
    } catch (error) {
        console.log(`Error : ${error}`)
    }
}

module.exports = { asyncHandler }