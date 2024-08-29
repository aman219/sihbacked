const { Router } = require('express')
const { registerEmployee } = require('../controllers/employee')
const { upload } = require('../middlewares/multer')

const router = Router();

router.route("/register").post(upload.single("profilePhoto"), registerEmployee)

module.exports = { router }