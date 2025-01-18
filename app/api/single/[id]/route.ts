import Task from "../../../../lib/models/Task";
import { connectDB } from "@/lib/connectDb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB()
  try {
    const id = (await params).id;
    const findSingleTask = await Task.findById(id);
    return Response.json({
      success: true,
      message: "Task Fetched",
      task: findSingleTask,
    });
  } catch (error) {
    if(error instanceof Error){
        return Response.json({success: false, message: "Error Occurred", error: error.message});
    }else{
        return Response.json({success: false, message: "Unknown Error Occurred"})
    }
  }
}
