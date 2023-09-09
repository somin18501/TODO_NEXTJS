import { errorHandler } from '@/middlewares/error';
import { User } from '@/models/user';
import { connectDB, cookieSetter, generateToken } from '@/utils/db';
import bcrypt from "bcrypt";

const registerHandler = async (req,res) => {
    try {
        if(req.method!=="POST") return errorHandler(res,400,"Only POST request is allowed");

        const {name,email,password} = req.body;
    
        if(!name || !email || !password) return errorHandler(res,400,"Please enter all details"); 
        
        await connectDB();
    
        let user = await User.findOne({email});
        
        if(user) return errorHandler(res,400,"User already registered with this email");
        
        const hashPassword = await bcrypt.hash(password,10);

        user = await User.create({
            name,
            email,
            password: hashPassword,
        });
        const token = generateToken(user._id);

        cookieSetter(res,token,true);

        res.status(201).json({
            success:true,
            message:"Registered Successfully",
            user,
        });

    } catch (error) {
        console.error(error);
    }
}

export default registerHandler