const { Router } = require('express')
const { auth } = require('../middlewares/auth')
const { addResource } = require('../controllers/resource')

const router = Router();

router.route("/add").post(auth, addResource)

module.exports = { router }