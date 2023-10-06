import express from "express";
import { checkout, getUserOrder, paymentVerification, razorpayKey } from "../controllers/payment.controller";

const payRouter = express.Router();

payRouter.post('/order',checkout);
payRouter.get('/getkey', razorpayKey);
payRouter.post('/payment', paymentVerification);
payRouter.get('/user-order/:userID', getUserOrder)


export default payRouter