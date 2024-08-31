const { Router } = require('express')
const { auth } = require('../middlewares/auth')
const { addDepartment } = require('../controllers/department')

const router = Router();

router.route("/add").post(auth, addDepartment)

module.exports = { router }