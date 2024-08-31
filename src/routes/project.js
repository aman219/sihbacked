const { Router } = require('express')
const { addPorject } = require('../controllers/project')
const { auth } = require('../middlewares/auth')
const { upload } = require('../middlewares/multer')

const router = Router()

router.route("/add").post(auth, upload.none(), addPorject)

module.exports = { router }