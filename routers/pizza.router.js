import express from "express";
import { addPizza, deletePizza, getPizza, getPizzaById, updatePizza } from "../controllers/pizza.controller";

const pizzaRouter = express.Router()

pizzaRouter.post('/add-pizza',addPizza);
pizzaRouter.get('/get-pizza', getPizza);
pizzaRouter.get('/get-pizza-by-id/:pizzaID',getPizzaById);
pizzaRouter.patch('/update-pizza/:pizzaID', updatePizza);
pizzaRouter.delete('/delete-pizza/:pizzaID', deletePizza);



export default pizzaRouter;