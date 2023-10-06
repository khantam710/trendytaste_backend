import { instance } from "../index";
import crypto from "crypto";
import cartModel from "../models/cart.model";
import paymentModel from "../models/payment.model";
import orderModel from "../models/processorder.model"

export const checkout = async(req,res) => {
    try{
        const { amount, userID } = req.body;
        // console.log(amount, "amount")

        const options = {
            amount : amount * 100,
            currency: "INR"
        };

        instance.orders.create(options, async function (err,order) {
            // console.log(order)
            if (err) {
                res.status(400).json({
                    message: err.message
                })
            }
            else {
                const orderData = new orderModel({
                    userID: userID,
                    order: order
                })

                orderData.save();

                res.status(200).json({
                    data: orderData,
                    message: "success"
                })
            }
        });
    }catch(error){
       res.status(500).json({
        message:`Server error ${error}`
       }) 
    }
}

// Get Razorpay Key
export const razorpayKey = (req,res) => {
    try{
        res.status(200).json({
            key: process.env.RAZORPAY_API_KEY
        })
    }catch(error) {
        res.status(500).json({
            message: `Server Error ${error}`
        })
    }
}

// Payment verification
export const paymentVerification = async(req,res) => {
    try{
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        console.log(razorpay_order_id, "razorpay")

        const orderFind = await orderModel.findOne({['order.id']:razorpay_order_id})
        console.log(orderFind)
        const userID = orderFind.userID
        console.log(userID, "userID")
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto

            .createHmac("sha256",process.env.RAZORPAY_API_SECRET)

            .update(body.toString())

            .digest("hex");
        
        const isAuthentic = expectedSignature === razorpay_signature

        if(isAuthentic){

            console.log(userID, "userID")
            const userCart = await cartModel.find({userID: userID})
            console.log(userCart, "userCart")
            
            await paymentModel.create({
                paymentID: razorpay_payment_id,
                orderID: razorpay_order_id,
                signature: razorpay_signature,
                userID: userID,
                userOrder: userCart,
                orderTotal: orderFind.order.amount/100
            })

            await cartModel.deleteMany({userID: userID})

            res.redirect(`http://localhost:5173?reference=${razorpay_payment_id}`)
        }
        else{
            res.status(400).json({
                success: false
            })
        }
    }catch(error){
        res.status(500).json({
            message: `Server error ${error}`
        })
    }
}

// Get Order
export const getUserOrder = async (req,res) =>{
    try{
        const userID = req.params.userID
        // console.log(userID)
        const getData = await paymentModel.find({userID: userID})
        // console.log(getData, "getData")

        if(getData) {
            res.status(200).json({
                data: getData,
                message: "Data fetched successfully"
            })
        }

        else{
            res.status(400).json({
                message: "Failed to fetch data"
            })
        }
    }catch(error) {
        res.status(500).json({
            message:`server Error ${error}`,
        })
    }
}

