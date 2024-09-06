const { Router } = require('express')
const { addPorject,
    addResponse
 } = require('../controllers/project')
const { auth } = require('../middlewares/auth')
const { upload } = require('../middlewares/multer')

const router = Router()

router.route("/add").post(auth, upload.none(), addPorject)
router.route("/addresponse").post(auth, upload.none(), addResponse)

module.exports = { router }