import { errorHandler } from "@/middlewares/error";
import { cookieSetter } from "@/utils/db";

const logoutHandler = async (req,res) => {
    try {
        if(req.method!=="GET") return errorHandler(res,400,"Only GET request is allowed");
        
        cookieSetter(res,null,false);

        res.status(200).json({
            success:true,
            message:"Logged Out Successfully",
        });
    } catch (error) {
        console.error(error);
    }
}

export default logoutHandler