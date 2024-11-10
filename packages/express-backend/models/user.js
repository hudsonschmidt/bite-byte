import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
        bucket: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: "Recipe",
    },
  },
  { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

export default User;