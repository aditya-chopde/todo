"use server"
import { connectDB } from "@/lib/connectDb";
import Task from "../../../lib/Task";


export async function POST(req: Request) {
  await connectDB();
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");

    const createTask = await Task.create({
      title,
      description,
    });

    return Response.json({
      success: true,
      message: "Task Created",
      task: createTask,
    });
  } catch (error) {
    if(error instanceof Error){
        return Response.json({success: false, message: "Error Occurred", error: error.message})
    }else{
        return Response.json({success: false, message: "Unknown Occurred"})
    }
  }
}
