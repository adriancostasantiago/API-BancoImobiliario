const database = require('../database/connection')

class BancoController {
    async novaConta(request, response) {
        const { usuario, banco, valorInicial } = request.body

        const sql = 'INSERT INTO conta (usuario, banco, saldo) VALUES ("' + usuario + '", "' + banco + '", ' + valorInicial + ')'

        try {
            const result = await database.query(sql)

            response.json(result[0])
        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
        }
    }

    async listarContas(request, response) {

        const sql = 'SELECT * FROM conta'

        try {
            const result = await database.query(sql)

            response.json(result[0])
        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
        }
    }

    async listarUmaConta(request, response) {
        const usuario = request.params['usuario']

        const sql = 'SELECT * FROM conta WHERE usuario = "' + usuario + '";'

        try {
            const result = await database.query(sql)

            response.json(result[0])
        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
        }
    }

    async atualizarConta(request, response) {
        const id = request.params['id']
        const { usuario, banco, saldo } = request.body

        var sql =
            'UPDATE                                     ' +
            '   conta                                   ' +
            'SET                                        ' +
            '   usuario     = "' + usuario + '",        ' +
            '   banco       = "' + banco + '"           '

        if (saldo != undefined)
            sql += ', saldo       = "' + saldo + '"  '

        sql += 'WHERE id = ' + id + ';  '

        if (saldo != undefined) {
            var sql2 =
                'INSERT INTO operacoes(  ' +
                '   contacreditoid,      ' +
                '   operacao,            ' +
                '   valor                ' +
                ')                       ' +
                'VALUES (                ' +
                '    ' + id + ',         ' +
                '    "ALTERAÇÃO CONTA",  ' +
                '    ' + saldo + '       ' +
                ' );                     '
        }

        try {
            var result = await database.query(sql)
            result = await database.query(sql2)

            response.json(result[0])
        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
        }
    }

    async deposito(request, response) {
        const { usuario, banco, valor } = request.body

        // const valoratualizado = valor +
        //     '+ (SELECT saldo FROM conta WHERE usuario = "' + usuario + '" and banco = "' + banco + ' LIMIT 1")'

        const id = '(SELECT id FROM conta WHERE usuario = "' + usuario + '" and banco = "' + banco + '")'

        var sql =
            'UPDATE                                                     ' +
            '   conta                                                   ' +
            'SET                                                        ' +
            '   saldo = ' + valor + ' + saldo                           ' +
            'WHERE                                                      ' +
            '   usuario = "' + usuario + '" and banco = "' + banco + '" '

        var sql2 =
            'INSERT INTO operacoes(  ' +
            '   contacreditoid,      ' +
            '   operacao,            ' +
            '   valor                ' +
            ')                       ' +
            'VALUES (                ' +
            '    ' + id + ',         ' +
            '    "DEPOSITO",         ' +
            '    ' + valor + '       ' +
            ' );                     '


        try {
            const result = await database.query(sql)
            result = await database.query(sql2)

            response.json(result[0])
        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
        }
    }


}

module.exports = new BancoController()