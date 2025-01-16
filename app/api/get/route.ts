import { Task } from "@/lib/models/Task";

export async function GET() {
    try {
        const getTasks = await Task.find();
        return Response.json({success: true, message: "Task Fetched", tasks: getTasks})
    } catch (error) {
        if(error instanceof Error){
            return Response.json({success: false, message: "Error Occurred", error: error.message})
        }else{
            return Response.json({success: false, message: "Unknown Error Occurred"})
        }
    }
}