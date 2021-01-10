const database = require('../database/connection')

class TaskController {
    async novaTarefa(request, response) {
        const { tarefa, descricao, responsavel } = request.body

        const sql = 'INSERT INTO tasks (tarefa, descricao, responsavel) VALUES (' + tarefa + ', ' + descricao + ', ' + responsavel + ')'

        try {
            const result = await database.query(sql)

            response.json(result[0])
        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
        }
    }

    async listarTarefas(request, response) {

        const sql = 'SELECT * FROM tasks'

        try {
            const result = await database.query(sql)

            response.json(result[0])
        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
        }
    }

    async listarUmaTarefa(request, response) {
        const id = request.params['id']

        const sql = 'SELECT * FROM tasks WHERE id = ' + id + ';'

        try {
            const result = await database.query(sql)

            response.json(result[0])
        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
        }
    }

    async atualizarTarefa(request, response) {
        const id = request.params['id']
        const { descricao } = request.body

        const sql = 'UPDATE tasks SET DESCRICAO = "' + descricao + '" WHERE id = ' + id + ';'

        try {
            const result = await database.query(sql)

            response.json(result[0])
        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
        }
    }

    async apagarTarefa(request, response) {
        const id = request.params['id']

        const sql = 'DELETE FROM tasks WHERE id = ' + id + ';'

        try {
            const result = await database.query(sql)

            response.json(result[0])
        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
        }
    }


}

module.exports = new TaskController()