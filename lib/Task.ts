import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

const Task = mongoose.models.task || mongoose.model("task", taskSchema);

export default Task;