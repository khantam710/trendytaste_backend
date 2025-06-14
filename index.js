import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import pizzaRouter from "./routers/pizza.router";
import cartRouter from "./routers/cart.router";
import userRouter from "./routers/user.router";
import payRouter from "./routers/payment.router";
import Razorpay from "razorpay";

dotenv.config()

const app = express();

// const port = 5000;
const port = process.env.port || 5000

app.use(cors());

// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));

app.use(express.static(__dirname))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.listen(port, ()=> console.log(`Server on port: ${port}`));

mongoose.connect(`mongodb+srv://khantam710:Tam123@cluster0.cidj3bf.mongodb.net/mern-pizza`)
  .then(() => console.log('Connected to database!'));

app.get("/", (req,res) => {
    res.send("Server is working")
})

app.use('/mern-pizza', pizzaRouter);
app.use('/cart', cartRouter);
app.use('/user',userRouter);
app.use('/mern-pizza',payRouter);

// console.log(process.env.RAZORPAY_API_KEY, "RAZOR KEY")

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET
})


