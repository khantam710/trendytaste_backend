import userModel from "../models/user.model";
import bcrypt from "bcrypt";

// Add User
export const register = async(req,res) => {
    try{
        const {name,email,address,contact,password} = req.body;
        const existUser = await userModel.findOne({email:email});
        console.log(existUser);
        if(existUser) {
            return res.status(403).json({
                message: "User Already exists"
            })
        }
        const hashPassword = bcrypt.hashSync(password,15)

        const userData = new userModel({
            name:name,
            email:email,
            address:address,
            contact:contact,
            password:hashPassword
        })

        const saveData = userData.save();
        if(saveData){
            res.status(201).json({
                data:userData,
                message:"User has been created successfully"
            })
        }else{
            res.status(400).json({
                message:"Failed to create user"
            })
        }
    }catch(error){
        res.status(500).json({
            message:`Server error: ${error}`
        })
    }
}

// Get all Users
export const getUser = async (req,res) => {
    try{
        const userData = await userModel.find();
        const saveData = userData;
        if(saveData){
            res.status(200).json({
                data:userData,
                message:'User Data fetched successfully'
            })
        }else{
            res.status(400).json({
                message:'Failed to fetch user data'
            })
        }
    }catch(error){
        res.status(500).json({
            message:`Server error ${error}`
        })
    }
}

// Login
export const login = async(req,res) => {
    try{
        const {email,password} = req.body;
        const existUser = await userModel.findOne({email});
        if(!existUser) {
            return res.status(400).json({
                message:"User not found"
            })
        }

        const match = await bcrypt.compare(password, existUser.password);
        if (match) {
            const currentUser = {
              name: existUser.name,
              email: existUser.email,
              address: existUser.address,
              contact: existUser.contact,
              isAdmin: existUser.isAdmin,
              _id: existUser._id,
            };
            console.log(currentUser, "currentUser")
            return res.status(200).json({
              data: currentUser,
              message: "Login Successful",
            });
          }
        else{
            return res.status(400).json({
                message:"Invalid Credentials!!!"
            })
        }
    }catch(error) {
        res.status(500).json({
            message:`Server error ${error}`
        })
    }
}


