const express = require('express')
const tasks = require('./routes/tasks')
const connectDB =  require('./db/connect')
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/error-handler')

require('dotenv').config()


const app = express();

app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks' , tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)



const port = 3000;

const start = async() =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port , ()=>{ console.log('server running on port 3000...')})

    }catch(err){
        console.log(err);
    }
}


start();



