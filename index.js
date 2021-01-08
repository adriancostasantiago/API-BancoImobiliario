const express = require('express')

const app = express()

app.listen(4000, () => {
    console.log("Aplicação rodando na porta 40000")
})

app.get('/', (resquest, response) => {
    response.send("Hello word")
})