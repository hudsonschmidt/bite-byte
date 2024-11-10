// models/user.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bucket: {
    type: [mongoose.Schema.Types.ObjectId], // Array of recipe IDs
    ref: "Recipe",
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
