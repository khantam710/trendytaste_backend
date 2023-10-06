import mongoose from "mongoose";
const Schema =mongoose.Schema
const date = new Date()
const month = date.getMonth() + 1

const paymentSchema = new Schema({
    paymentID:{
        type:String,
        required: true
    },
    orderID:{
        type:String,
        required:true
    },
    signature:{
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    userOrder: {
        type: Array,
        required: true
    },
    orderTotal: {
        type: Number,
        required: true
    },
    Date: {
        type: String,
        default: date.getDate() + "/" + month + "/" + date.getFullYear()
    }
},{
    timestamps: true
})

export default mongoose.model("payment",paymentSchema)