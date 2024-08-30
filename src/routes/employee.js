const { Router } = require('express')
const { registerEmployee,
    login,
    logout,
    refreshAccessToken
 } = require('../controllers/employee')
const { upload } = require('../middlewares/multer')
const { auth } = require('../middlewares/auth')

const router = Router();

router.route("/register").post(upload.single("profilePhoto"), registerEmployee)
router.route("/login").post(login)
router.route("/logout").get(auth, logout)
router.route("/refreshToken").get(refreshAccessToken)

module.exports = { router }