### use the custom error
> there is a better way to handle `errors`. for example in here:
```js
// get a single task
const getTask = asyncWrapper( async (req , res , next) =>{
        const {id : taskID } = req.params
        const task = await Task.findOne({_id:taskID})
        if(!task) {
            return res.status(404).json({ msg: `No task with id ${taskID}`   })
        }
        res.status(200).json({task })
    }
)
```
we are handling our `errors` like this. 

but we can do something like this:
```js
// get a single task
const getTask = asyncWrapper( async (req , res , next) =>{
        const {id : taskID } = req.params
        const task = await Task.findOne({_id:taskID})
        if(!task) {
           const error = new Error('not Found');
            error.status = 404
            return next(error)
        }
        res.status(200).json({task })
    }
)
```
1. create an `error` `object` and pass your message in it as argument
2. set the `status` property 
3. pass it to the `next` function so our custom `error-handler` can catch it and

```js
const errorHandlerMiddleware = (err , req , res , next) =>{
    console.log(err)
    return res.status(err.status).json({msg: err.message})
}
```
like this we can use our `message` and `status` like this.
