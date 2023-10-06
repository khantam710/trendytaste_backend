import mongoose from "mongoose";
const Schema = mongoose.Schema

const orderSchema = new Schema({
    userID:{
        type: Schema.Types.ObjectId,
        required: true
    },
    order: {
        type: Object,
        required: true
    }
})

export default mongoose.model("processorder", orderSchema);