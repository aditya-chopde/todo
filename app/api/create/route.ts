import { connectDB } from "@/lib/connectDb";
import { Task } from "@/lib/models/task";

export async function GET(req: Request){
    return Response.json({message: "Working"})
}

export async function POST(req: Request){
    await connectDB();
    const formData = await req.formData();
    const title = formData.get("title")
    const description = formData.get("description")
    
    const createTask = await Task.create({
        title, description
    })

    return Response.json({success: true, message: "Task Created", task: createTask});
}