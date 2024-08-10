const express = require('express')
const cors = require('cors')
const app = express()
const tasksController = require('./controllers/tasksController')
const usersController = require('./controllers/usersController')


// Middleware
app.use(cors())
app.use(express.json())
app.use('/tasks', tasksController)
app.use('/users', usersController)

// localhost:4001/
app.get('/', (req, res) => {
    res.status(200).json({ index: 'This is the index page' })
})

app.get('*', (req, res) => {
    res.status(404).json({ error: 'Page Not Found'})
})


module.exports = app