import { errorHandler } from "@/middlewares/error";
import { Task } from "@/models/task";
import { connectDB, validateUser } from "@/utils/db";

const taskHandler = async (req,res) => {
    const user = await validateUser(req);
        
    if(!user) return errorHandler(res,401,"Login First");
            
    // here req.query must have property of name same as file name
    const taskId = req.query.id;

    await connectDB();

    const task = await Task.findById(taskId);

    if(!task) return errorHandler(res,404,"Task not found");

    try {
        if(req.method==="PUT"){
            task.isCompleted = !task.isCompleted;

            await task.save();

            res.status(200).json({
                success: true,
                message: "Task updated Successfully",
            });
        }else if(req.method==="DELETE"){
            await task.deleteOne();
            res.status(200).json({
                success: true,
                message: "Task deleted Successfully",
            });
        }else{
            return errorHandler(res,400,"Only PUT/DELETE request is allowed");
        }
    } catch (error) {
        console.error(error);
    }
};

export default taskHandler;