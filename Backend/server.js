import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js';
connectDB()
connectCloudinary();

import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js';

//App config
const app = express()

//middlewares
app.use(express.json())
app.use(cors())
app.use('/user',userRouter);
app.use('/product',productRouter);

//api endpoints
app.get('/',(req,res)=>{
    res.send("API WORKING")
})

app.listen(process.env.PORT,()=> console.log(`Server is running on PORT ${process.env.PORT}`));