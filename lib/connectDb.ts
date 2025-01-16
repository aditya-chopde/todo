import mongoose from "mongoose";

export async function connectDB(){
    return await mongoose.connect("mongodb://localhost:27017/todo-next").then(()=>{
        console.log("Database Connected...")
    }).catch((error)=> {
        console.log("Error Ocurred: "+error.message)
    })
}