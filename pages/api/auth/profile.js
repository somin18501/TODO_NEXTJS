import { errorHandler } from "@/middlewares/error";
import { validateUser } from "@/utils/db";

const profileHandler = async (req,res) => {
    try {
        if(req.method!=="GET") return errorHandler(res,400,"Only GET request is allowed");
        
        const user = await validateUser(req);
        
        if(!user) return errorHandler(res,401,"Login First");
        
        res.status(200).json({
            success:true,
            user,
            message:"User Profile",
        });
    } catch (error) {
        console.error(error);
    }
}

export default profileHandler