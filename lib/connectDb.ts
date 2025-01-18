import mongoose from "mongoose";

export async function connectDB() {
  const mongoUrl = process.env.MONGOURL;
  if (!mongoUrl) {
    throw new Error("MONGOURL is not defined in the environment variables");
  }

  return mongoose.connect(mongoUrl)
    .then(() => {
      console.log("Database Connected...");
    })
    .catch((error) => {
      console.log("Error Occurred: " + error.message);
    });
}
