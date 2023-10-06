import express from "express";
import { register, getUser, login } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post('/register',register);
userRouter.get('/getuser',getUser);
userRouter.post('/login',login);

export default userRouter