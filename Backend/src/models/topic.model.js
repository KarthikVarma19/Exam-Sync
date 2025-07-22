import { Schema, model } from "mongoose";

/*
{
  _id: ObjectId,

  chapterId: ObjectId,                      // Reference to Chapter
  topicTitle: String,                       // Title of the topic
  topicIsPublished: Boolean,                // Controls if topic is visible to users
  topicResources: [ObjectId],               // References to Resource documents
  topicDifficulty: 'easy' | 'medium' | 'hard',

  topicAISummary: {                         // AI-generated summary metadata
    userQuery: String,                      // Prompt used to generate the summary
    limitText: Number,                      // Token/word limit
    generatedText: String,                  // Final AI summary
    confidenceScore: Number,                // Confidence score between 0-1
    generatedAt: Date,                      // When AI summary was generated
    modelVersion: String                    // e.g., GPT-4, Gemini-1.5, etc.
  },

  topicLastReviewedAt: Date,                // Manual review date for audit/trust
  topicViewsCount: Number,                  // For analytics & ranking

  createdAt: Date,
  updatedAt: Date
}

*/
const topicSchema = new Schema(
  {
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
      index: true,
    },
    topicTitle: {
      type: String,
      required: true,
      index: true,
    },
    topicIsPublished: {
      type: Boolean,
      default: false,
    },
    topicResources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource",
      },
    ],
    topicDifficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    topicAISummary: {
      userQuery: { type: String },
      limitText: { type: Number },
      generatedText: { type: String },
      confidenceScore: {
        type: Number,
        min: 0,
        max: 1,
      },
      generatedAt: { type: Date },
      modelVersion: { type: String },
    },
    topicLastReviewedAt: {
      type: Date,
    },
    topicViewsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Topic = model("Topic", topicSchema);
