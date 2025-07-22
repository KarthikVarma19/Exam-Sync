import { Schema, model } from "mongoose";

/*
{
  _id: ObjectId,
  roomId: ObjectId,                // Reference to the parent room/course
  chapterTitle: String,             // Title of the chapter
  description: String,             // Optional short description/summary of the chapter
  topics: [ObjectId],              // References to Topic documents
  order: Number,                   // Position/index to order chapters in a course
  isPublished: Boolean,            // Control visibility/publishing status
  isLocked: Boolean,               // If chapter is locked until prerequisite conditions are met
  tags: [String],                     // Tags or keywords for filtering/searching chapters
  resourcesCount: Number,          // Cache count of total resources in all topics (optional)
  createdBy: ObjectId,             // User ID who created the chapter
  updatedBy: ObjectId,             // User ID who last updated the chapter
  createdAt: Date,
  updatedAt: Date
}
 

*/

const chapterSchema = new Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    chapterTitle: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
    },

    prerequisite: {
      type: String,
    },
    topics: [
      {
        type: Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
        index: true,
      },
    ],
    resourcesCount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Chapter = model("Chapter", chapterSchema);

/*
order helps maintain chapter sequence in the UI without needing sorting logic repeatedly.

resourcesCount allows for faster analytics or dashboard rendering without aggregation overhead. Consider using a hook or scheduled job to keep it updated.

isLocked supports gamification/prerequisite logic for structured learning.

tags allow for search filtering using MongoDB text indexes.
*/
