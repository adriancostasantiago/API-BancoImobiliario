const { request } = require('express')
const database = require('../data/connection')

class TaskController {
    novaTarefa(request, response) {

        const { tarefa, descricao, responsavel } = request.body

        console.loj{ tarefa, descricao, responsavel }

        database.insert({ tarefa, descricao, responsavel }).table("tasks").then(data => {
            console.log(data)
            response.json({ message: "Tarefa criada com sucesso!" })
        }).catch(error => {
            console.log(error)
        })
    }
}

module.exports = new TaskController()