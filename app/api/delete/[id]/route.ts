import { Task } from "@/lib/models/Task";

export async function POST(req:Request, {params}: {params: Promise<{id: string}>}) {
    try {
        const id = (await params).id;
        const deletTask = await Task.findByIdAndDelete(id);
        return Response.json({success: true, message: "Task Deleted", task: deletTask})
    } catch (error) {
        if(error instanceof Error){
            return Response.json({success: false, mesgage: "Error Occurred", error: error.message});
        }else{
            return Response.json({success: false, message: "Unknown Error Occurred"});
        }
    }
}