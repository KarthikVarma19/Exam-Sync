import { Schema, model } from "mongoose";
/*
{
  _id: ObjectId,
  username: String,            // Unique, display name
  email: String,               // Unique email ID
  password: String,            // Hashed password (never store plain)
  refreshToken: String,        // to auto login
  createdRooms: [ObjectId],    // References to Room documents
  joinedRooms: [ObjectId],      // Rooms the user has joined
  profilePicUrl: String,        // Optional user profile picture
  lastLoginAt: TimeSteamp,       //Track user activity 
  loginHistory        Audit log or detect suspicious activity
  createdAt: Date,
  updatedAt: Date
}

*/

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!!!"],
      trim: true,
    },
    avatar: {
      type: String, // cloudinary url is stored
    },
    lastLoginAt: {
      type: Date,
    },
    loginHistory: [Date],
    refreshToken: {
      type: String,
    },
    createdRooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    joinedRooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
