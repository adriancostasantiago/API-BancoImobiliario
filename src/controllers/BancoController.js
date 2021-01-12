const database = require('../database/connection')

async function GetConta(usuario) {

    const sql = 'SELECT * FROM conta WHERE usuario = "' + usuario + '" '

    try {
        const result = await database.query(sql)

        return result[0][0]
    } catch (error) {
        return undefined
    }
}

async function SetOperacao(operacao, valor, { contadebitoid = -1, contacreditoid = -1 }) {

    const sql =
        'INSERT INTO operacoes(         ' +
        '   operacao,                   ' +
        '   valor,                      ' +
        '   contacreditoid,             ' +
        '   contadebitoid               ' +
        ')                              ' +
        'VALUES (                       ' +
        '    "' + operacao + '",        ' +
        '    ' + valor + ',             ' +
        '    ' + contacreditoid + ',    ' +
        '    ' + contadebitoid + '      ' +
        ' );                            '

    try {
        await database.execute(sql)
    } catch (error) {
        throw error
    }
}

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

        const conta = await GetConta(usuario)

        if (conta == undefined) {
            response.status(400).json({ message: 'Conta inexistente!' })
            return
        }

        var sql =
            'UPDATE                                 ' +
            '   conta                               ' +
            'SET                                    ' +
            '   saldo =   ' + valor + ' + saldo   ' +
            'WHERE                                  ' +
            '   usuario     = "' + usuario + '"     '


        try {
            await database.execute(sql)

            SetOperacao("DEPOSITO", valor, {
                contacreditoid: conta.id
            })

            response.json({ message: "Depósito realizado com sucesso!" })

        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
        }
    }

    async saque(request, response) {
        const { usuario, banco, valor } = request.body

        const conta = await GetConta(usuario)

        if (conta == undefined) {
            response.status(400).json({ message: 'Conta inexistente!' })
            return
        }

        if (conta.saldo < valor) {
            response.status(400).json({ message: 'Saldo insuficiente!' })
            return
        }

        var saldoatualizado = parseFloat(conta.saldo) - parseFloat(valor)

        var sql =
            'UPDATE                                 ' +
            '   conta                               ' +
            'SET                                    ' +
            '   saldo =   ' + saldoatualizado + '   ' +
            'WHERE                                  ' +
            '   usuario     = "' + usuario + '"     '

        try {
            await database.execute(sql)

            SetOperacao("SAQUE", valor, {
                contadebitoid: conta.id
            })

            response.json({ message: "sucesso!" })

        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
        }
    }


}

module.exports = new BancoController()