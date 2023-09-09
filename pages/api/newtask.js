import { errorHandler } from "@/middlewares/error";
import { Task } from "@/models/task";
import { connectDB, validateUser } from "@/utils/db";

const addTaskHandler = async (req,res) => {
    try {
        if(req.method!=="POST") return errorHandler(res,400,"Only POST request is allowed");
    
        await connectDB();

        const user = await validateUser(req);
        
        if(!user) return errorHandler(res,401,"Login First");

        const { title,description } = req.body;
        
        if(!title || !description) return errorHandler(res,400,"Enter title and description both");
        
        await Task.create({
            title,
            description,
            user: user._id,
        });
    
        res.status(201).json({
            success: true,
            message: "Task created",
        });
    } catch (error) {
        console.error(error);
    }
};

export default addTaskHandler;