import express from 'express';
import { config } from 'dotenv';
import router from './routes/routes';
import razorpay from "razorpay";
import cors from 'cors'

config();

const app = express();

app.use(cors())
app.use(express.json())
app.use(router);

const key:any = process.env.RAZORPAY_API_KEY

export var instance = new razorpay({
    key_id: key,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

const PORT = process.env.PORT ;

app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}`);
 });