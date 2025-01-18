import { connectDB } from "@/lib/connectDb";
import { Task } from "../../../../lib/models/Task";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB()
  try {
    const id = (await params).id;
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const updateTask = await Task.findByIdAndUpdate(id, {
      title,
      description,
    });

    return Response.json({
      success: true,
      message: "Task Edited",
      task: updateTask,
    });
  } catch (error) {
    if(error instanceof Error){
        return Response.json({success: true, message: "Error Occurred", error: error.message});
    }else{
        return Response.json({success: false, message: "Unknown Error Occurred"})
    }
  }
}
