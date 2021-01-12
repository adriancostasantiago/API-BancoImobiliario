const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')
const BancoController = require('../controllers/BancoController')

router.post('/tarefa', TaskController.novaTarefa)
router.get('/tarefa', TaskController.listarTarefas)
router.get('/tarefa/:id', TaskController.listarUmaTarefa)
router.put('/tarefa/:id', TaskController.atualizarTarefa)
router.delete('/tarefa/:id', TaskController.apagarTarefa)

//BANCO IMOBILIARIO
router.post('/conta', BancoController.novaConta)
router.get('/conta', BancoController.listarContas)
router.get('/conta/:usuario', BancoController.listarUmaConta)
router.put('/conta/:id', BancoController.atualizarConta)

router.post('/deposito', BancoController.deposito)

router.post('/saque', BancoController.saque)

router.post('/pagamento', BancoController.pagamento)
router.post('/transferencia', BancoController.transferencia)

router.get('/info', (request, response) => {
    response.send(`My name is ${request.query.nome} ${request.query.sobrenome}`)
})

module.exports = router