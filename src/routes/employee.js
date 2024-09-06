const { Router } = require('express')
const { registerEmployee,
    login,
    logout,
    refreshAccessToken,
    getEmployee,
    getNotification
 } = require('../controllers/employee')
const { upload } = require('../middlewares/multer')
const { auth } = require('../middlewares/auth')

const router = Router();

router.route("/register").post(upload.single("profilePhoto"), registerEmployee)
router.route("/login").post(upload.none(), login)
router.route("/logout").get(auth, logout)
router.route("/refreshToken").get(refreshAccessToken)
router.route("/get").get(auth, getEmployee)
router.route("/getnotification").get(auth, getNotification)

module.exports = { router }