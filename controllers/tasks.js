const Task = require('../models/task')


// get all tasks
const getAllTasks = async (req , res) =>{
    try{
        const tasks = await Task.find({}) //get all the document
        res.status(200).json({tasks})
    }catch(err){
        res.status(500).json({msg: error}) //general server error 
    }
}


// get a single task
const getTask = async (req , res ) =>{
    try {
        const {id : taskID } = req.params
        const task = await Task.findOne({_id:taskID})
        if(!task)  return res.status(404).json({ msg: `No task with id ${taskID}`   })
        res.status(200).json({task })
    } catch (error) {
        res.status(500).json({massege: error}) //general server error 
    }
}


// post
const createTask = async (req , res ) =>{
    try{
        const task = await Task.create(req.body)   
        res.status(201).json({task})
    }catch(error){
        res.status(500).json({msg: error}) //general server error 
    }
}


// put
const updateTask  =async (req , res) =>{
    const {id : taskID} = req.params

    // try{
    //     const task = await Task.updateOne({_id: taskID , req.body})

    //     if(!task) return res.status(404).json({msg: 'there is no task with this id'}) 
        
    //     res.status(200).json({task})
    // }catch(error){
    //     res.status(500).json({msg: error})
    // }
}


// delete
const deleteTask =async (req , res) =>{
    // res.send('delete Task')

    const {id : taskID } = req.params

    try{
        const task = await Task.findOneAndDelete({_id : taskID})

        if(!task) return res.status(404).json({msg: 'there is no such id'})

        res.status(200).json({task})
    }catch(error){
        res.status(500).json({msg: error})
    }
}



module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}