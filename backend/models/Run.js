import mongoose from "mongoose"; 

const runSchema = new mongoose.Schema({
    name: String, 
    date: String, 
    distance: Number, 
    duration: Number, 
    elapsedTime: Number,
    notes: String, 
    type: String,
    route: Array, 
});

export default mongoose.model("Run", runSchema); 