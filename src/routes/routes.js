const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')

router.post('/novaTarefa', TaskController.novaTarefa)

module.exports = router