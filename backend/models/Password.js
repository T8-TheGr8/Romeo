import mongoose from "mongoose"; 

const PasswordSchema = new mongoose.Schema({
  site: { type: String, required: true },
  username: { type: String },

  usernameCiphertext: { type: String },
  usernameIv: { type: String },
  usernameSalt: { type: String },
  usernameIterations: { type: Number },

  ciphertext: { type: String, required: true },
  iv: { type: String, required: true },
  salt: { type: String, required: true },
  iterations: { type: Number, required: true },
});

export default mongoose.model("PasswordEntry", PasswordSchema);
