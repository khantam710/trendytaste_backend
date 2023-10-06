import express from "express";
import { addtoCart, deleteCartItem, getcartData, updateQuantity } from "../controllers/cart.controller";

const cartRouter = express.Router()

cartRouter.post('/addtocart/:id', addtoCart);
cartRouter.get('/getcartdata',getcartData);
cartRouter.delete('/deletecartitem/:pizzaID',deleteCartItem);
cartRouter.patch('/updateQuantity/:id', updateQuantity);

export default cartRouter
