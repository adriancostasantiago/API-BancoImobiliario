const database = require('../database/connection')

class TaskController {
    async novaTarefa(request, response) {
        const { tarefa, descricao, responsavel } = request.body

        const sql = 'SELECT * FROM TsASKS'

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