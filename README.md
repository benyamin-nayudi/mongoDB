### the schema and model

to make the first `schema`:
1. make a folder name `model` in `db` folder.
2. make a `task.js` file
3. like this you can make your `schema` 
```js
const TaskSchema = new mongoose.Schema({
    name : String , 
    completed: Boolean
})

```

4. and then export the `model` of that `schema` 
```js
module.exports = mongoose.model('modelName' , TaskSchema)
```
5. now we can use our `model` in the `controllers` to make `crud` requests

```js
const createTask = async (req , res ) =>{

    const task = await Task.create(req.body)

    res.status(201).json({task})
}
```
> here we are making an `async` `post` action to our `database`. the `model` that we have created has a method name `.create` and by passing the `req.body` json, it posts that `json` to our `database`

>we can try it in `postman`. 

> there is an error for the `connection` via `mongoose` and you can resolve it by setting the Node.js version to 2.. and later in the `mongoDB` connection part.







