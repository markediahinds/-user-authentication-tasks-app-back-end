const express = require('express')
const tasks = express.Router({ mergeParams: true })
const { getTasks, getTask, createTask, updateTask, deleteTask } = require('../queries/tasks')
const { checkTitle } = require('../validations/tasks')


// localhost:4001/tasks/
tasks.get('/', async (req, res) => {
    try {
        const { user_id } = req.params
        const tasks = await getTasks()
        res.status(200).json(tasks)
    } catch (err) {
        res.status(404).json({ error: err })
    }
})


tasks.get('/:id', async (req, res) => {
    const {id, user_id } = req.params
    try {
        const task = await getTask(id, user_id)
        res.status(200).json(task)
    } catch (err) {
        res.status(404).json({ error: err })
    }
})


tasks.post('/', checkTitle, async (req, res) => {
    try {
        const createdTask = await createTask(req.body)
        res.status(201).json(createdTask)
    } catch (err) {
        res.status(500).json({ error: `Internal Service Error` })
    }
})


tasks.put('/:id', checkTitle, async (req,res) => {
    try {
        const { id } = req.params
        const updatedTask = await updateTask(id, req.body)
        res.status(200).json(updatedTask)
    } catch (err) {
        res.status(404).json({ error: err })
    }
})


tasks.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedTask = await deleteTask(id)
        res.status(200).json({ success: `Sucessfully deleted task` })
    } catch (err) {
        res.status(404).json({ error: err })
    }
})


module.exports = tasks