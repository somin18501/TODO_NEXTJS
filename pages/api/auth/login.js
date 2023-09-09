import { errorHandler } from "@/middlewares/error";
import { User } from "@/models/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/db";
import bcrypt from "bcrypt";

const loginHandler = async (req,res) => {
    try {
        if(req.method!=="POST") return errorHandler(res,400,"Only POST request is allowed");

        const {email,password} = req.body;
    
        if(!email || !password) return errorHandler(res,400,"Please enter all details"); 
        
        await connectDB();
        
        // as in User model password is select is false so res will not have user password so we need to manualy select it 
        let user = await User.findOne({email}).select("+password");
        
        if(!user) return errorHandler(res,400,"Invalid User Details");
        
        const auth = await bcrypt.compare(password,user.password);
        if(!auth) return errorHandler(res,400,"Invalid User Details");

        const token = generateToken(user._id);

        cookieSetter(res,token,true);

        res.status(200).json({
            success:true,
            message:"Logged In Successfully",
            user,
        });

    } catch (error) {
        console.error(error);
    }
    
}

export default loginHandler