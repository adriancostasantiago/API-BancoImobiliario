const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')
const BancoController = require('../controllers/BancoController')

router.post('/nova/tarefa', TaskController.novaTarefa)

router.get('/tarefa', TaskController.listarTarefas)

router.get('/tarefa/:id', TaskController.listarUmaTarefa)

router.put('/atualizar/tarefa/:id', TaskController.atualizarTarefa)

router.delete('/apagar/tarefa/:id', TaskController.apagarTarefa)

//BANCO IMOBILIARIO
router.post('/nova/conta', BancoController.novaConta)

router.get('/conta', BancoController.listarContas)

router.get('/conta/:usuario', BancoController.listarUmaConta)

router.put('/atualizar/conta/:id', BancoController.atualizarConta)

router.put('/deposito', BancoController.deposito)

router.put('/saque', BancoController.saque)

module.exports = router