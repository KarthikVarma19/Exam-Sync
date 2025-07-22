import { Schema, model } from "mongoose";

/*

{
  _id: ObjectId,

  roomName: String,                           // Name of the room
  roomCode: String,                          // 6digitslengthroomCode
  coverImage: url,
  createdBy: [ObjectId],                      // One or more creators (admins/founders)
  organizationName: String,                   // Org or institution this room belongs to

  isPublic: Boolean,                          // True for open access, false for restricted
  invitedUsers: [ObjectId],                   //if sending invites (or) given access to before they join.
  joinedUsers: [ObjectId],                   //for tracking actual members.
  expiresOn: Date,                            // room expiry date
  limitUsers: Number,                         // Max number of allowed users

  chapters: [ObjectId],                       // Reference to chapters
  editors: [ObjectId],                        // Users with write/edit access
  viewers: [ObjectId],                        // Users with read-only access

  settings: {
    allowChat: Boolean,                       // Enable/disable live discussion
    allowLiveReaders: Boolean,                // Show real-time viewers
    showCreator: Boolean                      // Display the creator publicly
  },

   roomActivityLogs: [
  {
    changedBy: ObjectId,                     // User who made the change
    changeType: "topic_added" | "chapter_updated" | "editor_assigned" | "resource_deleted",
    affectedEntities: [ObjectId], // Optional: references to Topic/Chapter/etc.
    timestamp: Date
  }
]

  roomTags: [String],
   roomStatus: 'active' | 'inactive' | 'archived',   // Filtering active/inactive rooms
   roomType: 'classroom' | 'project' | 'study-room' // Custom logic per roomType (e.g., enable analytics only in "classroom")
  createdAt: Date,
  updatedAt: Date
}



*/
//TODO: Add Still More enum's
const roomActivityLogSchema = new Schema({
  changedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  changeType: {
    type: String,
    enum: [
      "topic_added",
      "chapter_updated",
      "editor_assigned",
      "resource_deleted",
    ],
    required: true,
  },
  affectedEntities: [{ type: Schema.Types.ObjectId }],
  timestamp: { type: Date, default: Date.now },
});

const roomSchema = new Schema(
  {
    roomName: { type: String, required: true },
    roomCode: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 6,
    },
    coverImage: { type: String },

    createdBy: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    organizationName: { type: String },

    isPublic: { type: Boolean, default: false },
    invitedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    joinedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],

    expiresOn: { type: Date },
    limitUsers: { type: Number, default: 50 },

    chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
    editors: [{ type: Schema.Types.ObjectId, ref: "User" }],
    viewers: [{ type: Schema.Types.ObjectId, ref: "User" }],

    settings: {
      allowChat: { type: Boolean, default: false },
      allowLiveReaders: { type: Boolean, default: false },
      showCreator: { type: Boolean, default: false },
    },

    roomActivityLogs: [roomActivityLogSchema],

    roomTags: [{ type: String }],
    roomStatus: {
      type: String,
      enum: ["active", "inactive", "archived"],
      default: "active",
    },
    roomType: {
      type: String,
      enum: ["classroom", "project", "study-room"],
      default: "classroom",
    },
  },
  { timestamps: true }
);

roomSchema.index({ roomCode: 1 }, { unique: true });
roomSchema.index({ roomStatus: 1 });
roomSchema.index({ roomName: 1 });
roomSchema.index({ roomType: 1 });
roomSchema.index({ roomTags: 1 });

export const Room = model("Room", roomSchema);
