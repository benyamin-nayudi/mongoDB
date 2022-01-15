### how to connect the mongo DB:
1. first you should make an `account` and a `database` and `cluster`.
2. each `cluster` has its `documents` for example => the `Store` database has two `Products` and `User` documents. 
> inside the documents are our `key-value` pairs .
> you can add any type of data in the `document` and each data may differ from another one `(but you shouldn't...) `
3. then we want to `connect` our `DB` so we copy the `string` and place it in our document 
4. make a file `connect.js` inside `db` folder and make a function that return the `mongoose.connect` method
> this method accepts two `argument`. the first one is the `connection string` and the second one is an `object` that deal with the `deprecation` things. 

```js
const connectDB = (url) =>{
    return mongoose.connect(connectionString , {
        useNewUrlParser: true , 
        useCreateIndex: true,
        useFindAndModify: false , 
        useUnifiedTopology : true
    })
}
   
```
5. after exporting our `connect` function, the goal is to first wait to connect to the `database` then run the `server`, so we can make a `start` async function that takes the `connect` and `listen` function . 

```js
const start = async() =>{
    try{
        await connectDB()
        app.listen(port , ()=>{ console.log('server running on port 3000...')})

    }catch(err){
        console.log(err);
    }
}

```

6. we can use the `dotenv` package when dealing with secret values like connection string etc. and make sure to add the `.env` file to the `.gitignore`
---
### setup `dotenv` package

> to setup this package just :
1. make a `.env` file and add it to the `.gitignore`.
2. place the `connectionString` there like this:
```
MONGO_URI=mongodb+srv://benyamin:pass@benyamincluster.9wfsm.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority
```
> no need to place it as `string` ...
3. invoke the `package` and `config` method to access the env secret values
```js
require('dotenv').config()
```
> no need to assign it to any `variable`...
4. then since we don't need to any hardcoded string in our `connection` function , we should pass the `MONGO_URI` as an argument to the `start` function and pass it to the `connect` function via `process.env.MONGO_URI`.

```js
const start = async() =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port , ()=>{ console.log('server running on port 3000...')})

    }catch(err){
        console.log(err);
    }
}
```