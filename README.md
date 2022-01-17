### what happened in the error handling?

1. so , we have some problem here. the first one is that this `error handler` codes are dirty:
```js
// patch
const updateTask = asyncWrapperMiddleware(async (req ,res) =>{
    const {id} = req.params;

    const task = await Task.findOneAndUpdate({_id: id } , req.body ,{
        new: true, 
        runValidators: true
    })
    if(!task){
        return res.status(404).json({msg: `there is no task with id ${id}`})
    }
    return res.status(200).json({task})
})
```
our `404 error` is being handled like this 

```js
 if(!task){
        return res.status(404).json({msg: `there is no task with id ${id}`})
    }
```

2. our second problem is that our `error-handler` just takes care of our `castError` (500)
```js
const errorHandlerMiddleware = (err , req , res , next) =>{
    return res.status(500).json({msg: 'i am a cast error'})
}

module.exports = errorHandlerMiddleware
```
---
## so we want to make an easier functionality:
1. we can make a function `createCustomError` and pass it our `message` and the `status code`  
2. a functionality that checks whether that `error` is `404` or not and throw a proper `error`.

for this, first we should make a folder name `custom-error`. and:
```js
class CustomAPIError extends Error {
    constructor(message , statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomError = (msg , statusCode) =>{
    return new CustomAPIError(msg , statusCode)
}

module.exports = {createCustomError , CustomAPIError}
```
what is this code doing:
1. we are extending the `Error` class by creating a `new` instance of it. actually we are making an `object` with a `message` and `statusCode` properties.
2. then for simplicity we have made a `createCustomError` function that takes a `message` and `statusCode` and returns a new instance of `CustomAPIError` class.


- so by creating functionality , we now can use it for handling our `404` errors like this:
```js
// get a single task
const getTask = asyncWrapper( async (req , res , next) =>{
        const {id : taskID } = req.params
        const task = await Task.findOne({_id:taskID})
        if(!task) {
            return next(createCustomError('no task with this id ' , 404))
        }
        res.status(200).json({task })
    }
)
```
what is happening here:
1. here we may have two `errors` : `castError`(500) and `404` error
2. to manage the `404` error we are checking if the `id` is not available , call the `next` method and pass it our `function`.
```js
next(createCustomError('no task with this id ' , 404))
```
3. here the `createCustomError` will returns an `object` made by the `CustomAPIError` class that have two properties : `message` and `statusCode`

4. now by passing it through the `next` method we are giving this error to the `handle-error` functionality that previously was handling just our `castError`. here:

```js
const errorHandlerMiddleware = (err , req , res , next) =>{
    return res.status(500).json({msg: 'i am a cast error'})
}
module.exports = errorHandlerMiddleware
```

so if we could check the `error` that comes to this file , we can make a proper decision for what `error` we should `throw` .so :

```js
const { CustomAPIError } = require('../errors/custom-error')

const errorHandlerMiddleware = (err , req , res , next) =>{
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg : err.message})
    }
    return res.status(500).json({msg: 'something went wrong'})
}

module.exports = errorHandlerMiddleware
```

- here we are importing our `CustomAPIError` class and check if the coming `error` is an `instance` of it or not. 
    - if it was an instance of it so it must made by the `createCustomError` function and it certainly does have the `statusCode` and the `message`. so we can return our `error` with a proper `status code` and `message` .
    - if it wasn't an instance of the `class`, so it is a `castError` so we like before just throw a `500` error.

