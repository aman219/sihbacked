const { Router } = require('express')
const {register } = require('../controllers/users')

const router = Router();

router.route("/register").get(register)

module.exports = { router }