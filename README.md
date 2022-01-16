### mongoose crud methods
> mongoose has some built it crud methods (static helper functions) to deal with the data. for getting all of the data we can use the .find method 

> if you pass an empty object to the find method it will return all of the database .
```js
// get all tasks
const getAllTasks = async (req , res) =>{
    try{
        const tasks = await Task.find({}) //get all the document
        res.status(200).json({tasks})
    }catch(err){
        res.status(500).json({msg: error}) //general server error 
    }
}
```

--- handling errors 
```js
const getTask = async (req , res ) =>{
    try {
        const {id : taskID } = req.params
        const task = await Task.findOne({_id:taskID})

        if(!task) return res.status(404).json({msg:`No task with id ${task.id}`})

        res.status(200).json({task })
    } catch (error) {
        res.status(500).json({msg: error}) //general server error 
    }
}

```
> the reason why we have two `response` for errors here is that we would have two king of `errors`
1. the first one when the id passed in the request doesn't match any of the `tasks` in the `database` for example we change the last character of the id (the whole id length remain the `same`)

2. the second one when the id passed to `mongoose` is `wrong` and actually we are facing the problem from `mongoose` (for example we add another character to id) => `cast Error`

--- 
the `delete` functionality is almost like the `getSingleTask` and instead of `findOne` we use `findOneAndDelete` method.