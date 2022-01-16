const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')





// get all tasks
const getAllTasks = asyncWrapper( async (req , res) =>{
        const tasks = await Task.find({}) //get all the document
        res.status(200).json({tasks})
})



// get a single task
const getTask = asyncWrapper( async (req , res ) =>{
        const {id : taskID } = req.params
        const task = await Task.findOne({_id:taskID})
        if(!task)  return res.status(404).json({ msg: `No task with id ${taskID}`   })
        res.status(200).json({task })
    }
)


// post
const createTask = asyncWrapper(
    async (req , res ) =>{
        const task = await Task.create(req.body)   
        res.status(201).json({task})
})



// delete
const deleteTask =asyncWrapper(
    async (req , res) =>{
        const {id : taskID } = req.params
        const task = await Task.findOneAndDelete({_id : taskID})
        if(!task) return res.status(404).json({msg: 'there is no such id'})
        res.status(200).json({task})
    }
)


// put
const updateTask  =asyncWrapper(
    async (req , res) =>{
    
        const {id : taskID} = req.params
        const task = await Task.findByIdAndUpdate({_id: taskID } , req.body , {
            new: true,
            runValidators: true
        })

        if(!task) return res.status(404).json({msg: 'there is no task with this id'}) 
        
        res.status(200).json({task})
    }
    
)



module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}