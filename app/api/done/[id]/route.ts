import Task from "@/lib/models/Task";
import { connectDB } from "@/lib/connectDb";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  try {
    const id = (await params).id;
    const checkStatus = await Task.findById(id);
    const updateTask = await Task.findByIdAndUpdate(id, {
      status: true,
    });
    return Response.json({
      success: true,
      message: "Task Mark As Done",
      task: updateTask,
    });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({
        success: true,
        message: "Error Occurred",
        error: error.message,
      });
    } else {
      return Response.json({
        success: false,
        message: "Unknown Error Occurred",
      });
    }
  }
}
