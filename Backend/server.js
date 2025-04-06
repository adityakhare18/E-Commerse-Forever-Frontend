import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
connectDB()

//App config
const app = express()

//middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.get('/',(req,res)=>{
    res.send("API WORKING")
})

app.listen(process.env.PORT,()=> console.log(`Server is running on PORT ${process.env.PORT}`));