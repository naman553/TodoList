import User from "../model/user.model.js";
import {z} from 'zod';
import bcrypt from 'bcryptjs';
import { generateTokenAndSaveToCookie } from "../jwt/token.js";
import cookieParser from 'cookie-parser'

const userSchema = z.object({
    email: z.string().email({errors:"Invalid email address"}),
    username: z.string().min(3,{errors:"username must be atleast 3 characters long"}),
    password : z.string().min(6,{errors:"password must be atleast 6 characters long"})
})

export const register=async (req,res)=>{
    try {
        const {email , username , password} = req.body;

        if(!email || !username || !password){
            return res.status(400).json({errors:"All fields are required"});
        }
        const validation = userSchema.safeParse({email,username,password});
        if(!validation.success){
            
            const errorMessage =validation.error.errors.map((err) => err.message);
            return res.status(400).json({errors: errorMessage})
        }

        const user =await User.findOne({email})
        if(user){
           return res.status(400).json({errors:"user already registered"})
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({email,username,password:hashPassword})
        await newUser.save()
        if(newUser){
           const token = await generateTokenAndSaveToCookie(newUser._id , res)
           
            res.status(201).json({errors:"user registered successfully" ,newUser ,token})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({errors:"Error creating user"})
    }
   
}
export const login=async (req,res)=>{
    const {email,password}=req.body;
    try {
        if(!email || !password){
            return res.statsus(500).json({errors:"all fields are required"})
        }
        const user =await User.findOne({email}).select("+password")
        if(!user || !(await bcrypt.compare(password,user.password))){
          return  res.status(400).json({errors:"invalid email or password"});
        }

           const token = await generateTokenAndSaveToCookie(user._id , res)

        
        res.status(200).json({message:"user logged in successfully" , user })
    } catch (error) {
        console.log(error)
        res.status(500).json({errors:"Error logging in user"})
    }
}
export const logout=(req,res)=>{
    try {
        res.clearCookie("jwt",{
            path:'/'
        })
        res.status(200).json({message:'user logged out successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error logging out user"})
    }
}