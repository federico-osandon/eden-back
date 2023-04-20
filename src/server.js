const express = require('express')
const logger = require('morgan')
const routerApp = require('./routes/index')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = 8080 || process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(logger('dev'))


app.use(routerApp)


app.listen(PORT, err =>{
    if(err)  console.log(err)
    console.log(`Escuchando en el puerto ${PORT}`)
})