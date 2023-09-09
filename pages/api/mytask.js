import { errorHandler } from "@/middlewares/error";
import { Task } from "@/models/task";
import { connectDB, validateUser } from "@/utils/db";

const myTaskHandler = async (req,res) => {
    try {
        if(req.method!=="GET") return errorHandler(res,400,"Only GET request is allowed");
    
        const user = await validateUser(req);
        
        if(!user) return errorHandler(res,401,"Login First");
        
        await connectDB();

        const userTasks = await Task.find({user:user._id}); 

        res.status(200).json({
            success: true,
            tasks: userTasks,
            message: "list of all tasks of user",
        });
    } catch (error) {
        console.error(error);
    }
};

export default myTaskHandler;