import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import todoRouter from '../backend/route/todo.route.js'
import userRouter from '../backend/route/user.route.js'
import cors from "cors"
const App = express();

dotenv.config()

const port= process.env.PORT || 4001;


App.use(express.json())
App.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:"GET,POST,PUT,DELETE",
    allowedHeaders:["Content-type", "Authorization"]
}))


try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('connected to mongoDB')
} catch (error) {
    console.log(error)
}


App.get('/' , (req , res)=>{
    res.send("hello");
})
App.use("/todo", todoRouter)
App.use("/user", userRouter)

App.listen(port, ()=>{
    console.log(`listening on ${port}`);
})