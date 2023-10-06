import pizzaModel from "../models/pizza.model";

// ===================== CREATE PIZZA ======================
export const addPizza = (req,res) =>{
    try {
        // img is coming from a url hence no multer
        const {name,size,price,category,image,description} =req.body
    
        const addData = new pizzaModel({
            name: name,
            size: size,
            price: price,
            category:category,
            image:image,
            description:description
        })
        addData.save()
    
        if(addData){
            res.status(201).json({
               data:addData,
               message:"Data saved to database" 
            })
       
        }
    
        else{
            res.status(400).json({
                data:addData,
                message:"Error while saving data" 
             })    
        }
    } catch (error) {
        res.status(500).json({
            message:`"Server Error:${error}` 
         })
    }
    
    }

// ====================== READ PIZZA =======================

export const getPizza = async(req,res) => {
    try{
        const getData = await pizzaModel.find()

        if(getData){
            res.status(200).json({
                data:getData,
                message:"Data fetched successfully"
            })
        }

        else{
            res.status(400).json({
                data:addData,
                message:"Error while fetching data"
            })
        }
    }catch(error){
        res.status(500).json({
            message:`"Server Error: ${error}`
        })
    }
}

// ====================== READ PIZZA BY ID ====================

export const getPizzaById = async(req,res) => {
    try{
        const pizzaID = req.params.pizzaID;

        const getPizza = await pizzaModel.findOne({_id:pizzaID});

        if(getPizza){
            res.status(200).json({
                data:getPizza,
                message:"Pizza details fetched successfully"
            })
        }else{
            res.status(400).json({
                message:"Failed to fetch pizza details"
            })
        }

    }catch(error){
        res.status(500).json({
            message:`Server Error: ${error}`
        })
    }
}

// ====================== UPDATE PIZZA =======================

export const updatePizza = async(req,res) => {
    try{
        const pizzaID =  req.params.pizzaID;
        const {name,size,price,category,image,description} = req.body;

        const updatePizzaData = await pizzaModel.updateOne(
            {_id:pizzaID},
            {
                $set:{
                    name:name,
                    size:size,
                    price:price,
                    category:category,
                    image:image,
                    description:description
                }
            }
        )
        if(updatePizzaData){
            res.status(200).json({
                data:updatePizzaData,
                message:"Pizza details updated successfully"
            })
        }else{
            res.status(400).json({
                message:"Failed to update pizza details"
            })
        }
    }catch(error) {
        res.status(500).json({
            message:`Server Error: ${error}`
        })
    }
}

// ====================== DELETE PIZZA =======================

export const deletePizza = async(req,res) => {
    try{
        const pizzaID = req.params.pizzaID;
        const deletePizzaData = await pizzaModel.deleteOne({_id:pizzaID});

        if(deletePizzaData){
            res.status(200).json({
                message:"Pizza deleted successfully"
            })
        }else{
            res.status(400).json({
                message:"Failed to delete Pizza"
            })
        }
    }catch(error) {
        res.status(500).json({
            message:error.message
        })
    }
}
