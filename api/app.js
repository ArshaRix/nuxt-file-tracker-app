const express = require('express')
const cors = require('cors')

const app = express()
const connect = require('./config/mongodb')
connect()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const users = require('./routes/users')
const documents = require('./routes/documents')
const gmc = require('./routes/file/gmc')
const clr = require('./routes/file/clr')
const tor = require('./routes/file/tor')

app.use('/users', users)
app.use('/documents', documents)
app.use('/gmc', gmc)
app.use('/clr', clr)
app.use('/tor', tor)

module.exports = {
    path: '/api',
    handler: app
}  