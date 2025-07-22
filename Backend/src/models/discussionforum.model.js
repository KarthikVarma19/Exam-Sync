import { Schema, model } from "mongoose";

const aiGroupedThreadSchema = new Schema({
  tag: {
    type: String,
    enum: ['faq', 'sentiment', 'praise', 'bug', 'feedback', 'question'],
    required: true
  },
  summary: { type: String, required: true },
  relatedMessages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  confidenceScore: { type: Number, min: 0, max: 1 },
  createdByAIModel: { type: String }, // e.g., 'GPT-4-turbo', 'Gemini-1.5'
  generatedAt: { type: Date, default: Date.now }
});

const discussionForumSchema = new Schema({
  roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  moderators: [{ type: Schema.Types.ObjectId, ref: 'User' }],

  aiGroupedThreads: [aiGroupedThreadSchema],

}, {timestamps: true});

export const  DiscussionForum = model('DiscussionForum', discussionForumSchema);
