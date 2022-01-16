### validation

> since now we have made our `post` call to `database`, but there is a problem and that is we can post `empty values` to our database , so we need some `validation`. we can make our custom `validators` in the `schema file`.

so we can make our `validators` by passing `object` to our `properties` like this:

```js
const TaskSchema = new mongoose.Schema({
    name : {
        type: String ,
        required : [true , 'must provide a name'] ,
        trim: true ,
        maxlength: [20 , 'name can not be more than 20 characters']
    }, 
    completed: {
        type : Boolean , 
        default: false
    }
})
```
-  note that we can write either `true` for the `required` validator or give it an `array` and a `message` for handling the error.
- we can `trim` our string for names such `'       beny     '`
- we can make a `maxlength` or `minlength` 
- we can put a `default` value for a specific property

---
and we can make our functionality to handle `error`:

```js
const createTask = async (req , res ) =>{
    try{
        const task = await Task.create(req.body)   
        res.status(201).json({task})
    }catch(error){
        res.status(500).json({msg: error}) //general server error 
    }
}
```