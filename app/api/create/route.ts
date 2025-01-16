export async function GET(req: Request){
    return Response.json({message: "Working"})
}

export async function POST(req: Request){
    const formData = await req.formData();
    const title = formData.get("title")
    const description = formData.get("description")
    return Response.json({title, description})
}