### make a middleware to handle our repetitive crud calls
> so the problem here is that we want to avoid using repetitive try,catch blocks like this:
```js
//get all 
const getAllTasks = async (req ,res) =>{
    try {
        const tasks = await Task.find({})
        
        return res.status(200).json({tasks})
    } catch (error) {
        return res.status(500).json({msg: error})
    }
}

```

and we want to make a middleware to simply take our function and wrap it inside an async function with a built in try-catch block

so we can make a middleware name asyncWrapper like this:
```js
const asyncWrapper = (fn) =>{
    return async(req , res , next) =>{
        try {
            await fn(req , res , next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = asyncWrapper
```

and our function will be like this:
```js
// get all tasks
const getAllTasks = asyncWrapper( async (req , res) =>{
        const tasks = await Task.find({}) //get all the document
        res.status(200).json({tasks})
})
```

so this function `(asyncWrapper)` simply does the following :
- first takes the `async` function we had, as `parameter` and `invoke` it inside the `try` block.
- we somehow made a `boilerplate` for the `try-catch` block .
- by removing the `try-catch` block from the `getAllTasks` function we now have an `async` function with two line of codes. this function returns a `promise` so we can await for it inside the `asyncWrapper` function.
> `await fn(req , res , next)`

- by default , the `middleware` have access to the `req` ,`res` and `next` objects.
- we invoke the `fn` function passing the `req`,`res` and `next` objects to it (because in the `getAllTask` we need them ) 






---
### error handler

> we can build some `error handler` middleware. for this :
1. make a file call `error-handler` and make a `function`
2. to handle an error , you can pass `4` parameters to the function and the `first` one will be the `error`.
```js
const errorHandlerMiddleware = (err , req , res , next) =>{
    return res.status(500).json({msg: `something went wrong , try again later...`})
}

module.exports = errorHandlerMiddleware
```

3. if you don't specify any custom `error handler` the `express` itself takes care of the `errors` via some built in `error handlers`
4. try to use the `error handler` by using the` app.use` function
```css
app.use(errorHandlerMiddleware)
```