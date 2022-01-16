### make a middleware to handle our repetitive crud calls













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