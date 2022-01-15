const express = require('express')
const { getAllTasks , getTask, createTask, updateTask, deleteTask } = require('../controllers/tasks')

/*
our routes will be like this:
app.get('/api/v1/tasks')
app.post('/api/v1/tasks')
app.get('/api/v1/tasks/:id')
app.patch('/api/v1/tasks/:id')
app.delete('/api/v1/tasks/:id')
*/

const router = express.Router();

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)




module.exports = router







