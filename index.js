const express = require('express')
const database = require('./src/database/connection')
const router = require('./src/routes/routes')

const app = express()
app.use(express.json())
app.use(router)

app.listen(process.env.PORT || 4000, () => {
    console.log("Aplicação rodando na porta 40000")
})

app.get('/', (resquest, response) => {
    response.send("Hello word")
})