import jwt from 'jsonwebtoken'
import User from '../model/user.model.js'
export const authenticate=async (req,res,next)=>{
    const token = req.cookies.jwt
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try {
       const decodedUser = jwt.verify(token,process.env.JWT_SECRETKEY)
       req.user = await User.findById(decodedUser.userId)
    } catch (error) {
        return res.status(401).json({message:`${error.message}`})
    }
    next()
   
}