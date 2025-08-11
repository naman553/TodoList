import jwt from 'jsonwebtoken'
import User from '../model/user.model.js'
export const generateTokenAndSaveToCookie =async (userId , res) => {
    const token = jwt.sign({userId},  process.env.JWT_SECRETKEY, {
        expiresIn:'10d'
    })
    res.cookie("jwt" , token, {
        httpOnly:true,
        secure:false,
        sameSite:'lax',
        path:'/'
    })
    await User.findByIdAndUpdate(userId , {token});
    return token;
}