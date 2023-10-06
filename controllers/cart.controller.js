import cartModel from "../models/cart.model";
import pizzaModel from "../models/pizza.model";
import mongoose from "mongoose";

// Add Data to Cart
export const addtoCart = async(req,res) => {
    try{
        const id = req.params.id;
        // console.log(id,"id");
        const pizzaID = new mongoose.Types.ObjectId(id);

        const {size,quantity,price, userID} = req.body;
        console.log(userID, "cartUserID")

        const itemExists = await cartModel.findOne({pizzaID:pizzaID, size: size});
        console.log(itemExists,"itemExists")

        const data = await pizzaModel.findOne({_id:pizzaID});
        console.log(data)

        let updateData, addData;
        if(itemExists) {
            updateData = await cartModel.updateOne({ _id: itemExists._id}, {
                $set: {
                    name: data.name,
                    category: data.category,
                    price: (itemExists.price/itemExists.quantity)*(itemExists.quantity+1),
                    quantity: itemExists.quantity + 1,
                    size: size,
                    image: data.image,
                    pizzaID: data.pizzaID,
                    userID: userID
                }
            });
        } else {
            addData = new cartModel({
                name:data.name,
                price:price,
                image:data.image,
                quantity:quantity,
                size:size,
                pizzaID: data._id,
                category:data.category,
                userID: userID
            });
            addData.save()
        }
        
        const new_data = await cartModel.findOne({pizzaID:pizzaID});
        console.log(new_data,"new_data")

        if(addData || updateData){
            res.status(201).json({
                data: new_data || addData,
                message:"Data saved to database"
            })
        }

        else{
            res.status(400).json({
                data:addData,
                message:"Error while saving data"
            })
        }

    }catch(error) {
        res.status(500).json({
            message:`Server Error:${error}`
        })
    }
}



// Get All Carts
export const getcartData = async (req,res) => {
    try{
        const cartData = await cartModel.find();

        if(cartData){
            res.status(200).json({
                data:cartData,
                message:'Cart retrieved successfully'
            })
        }else{
            res.status(400).json({
                message:'Cart not found'
            })
        }
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

// Delete Cart
export const deleteCartItem = async(req,res) =>{
    try{
        const pizzaID = req.params.pizzaID;
        const data = await cartModel.findOne({_id:pizzaID});
        const delItem = await cartModel.deleteOne({_id:pizzaID});

        if(delItem.deletedCount==1){
            res.status(200).json({
                data:data,
                message:"Cart Item deleted successfully"
            })
        }else{
            res.status(400).json({
                message:"Failed to delete cart item"
            })
        }
    }catch(error){
        res.status(500).json({
            message:`Server Error:${error}`
        })
    }
}

// Update Cart
export const updateQuantity = async(req,res) => {
    try{
        const id = req.params.id;
        const data = await cartModel.findOne({_id:id});
        console.log(data,"data");
        const originalPrice = data.price/data.quantity;
        console.log(originalPrice,"originalPrice");

        const {quantity} = req.body;

        const updateData = await cartModel.updateOne({_id:id},{
            $set:{
                name:data.name,
                category:data.category,
                price:originalPrice*quantity,
                quantity:quantity,
                size:data.size,
                image:data.image,
                pizzaID:data.pizzaID
            } 
        })
        const new_data = await cartModel.findOne({_id:id});

        if(updateData){
            res.status(200).json({
                data: new_data,
                message: "Data updated successfully"
            })
        }
        else{
            res.status(400).json({
                error:"Error in updating the Data"
            })
        }
    }catch(error){
        res.status(500).json({
            message:`Server Error:${error}`
        })  
    }
}
