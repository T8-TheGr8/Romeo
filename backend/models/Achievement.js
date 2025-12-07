import mongoose from "mongoose"; 

const achievementSchema = new mongoose.Schema({
  name: { type: String, required: true}, 
  type: { type: string, enum: ["one_time", "progress", "streak"], required: true},
  earned: { type: Boolean, default: false},

  runId: String, 
});


export default mongoose.model("Achievement", achievementSchema);

// 