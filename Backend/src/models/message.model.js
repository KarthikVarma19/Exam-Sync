import { Schema, model } from "mongoose";
/*
{
  _id: ObjectId,

  userId: ObjectId,                         // Who sent the message
  message: String,                          // The actual message text
  replyTo: ObjectId,                        // If it's a reply to another message

  roomId: ObjectId,                         // Room context
  chapterId: ObjectId,                      // Optional: Chapter-level context
  topicId: ObjectId,                        // Optional: Topic-level context

  messageType: 'text' | 'image' | 'code' | 'link',  // Optional for rendering logic
  reactions: [{ emoji: String, users: [ObjectId] }],// Emoji reactions support

  isEdited: Boolean,                        // For message editing history
  isPinned: Boolean,                        //To mark key messages in discussions
  createdAt: Date,
  updatedAt: Date
}

*/


const reactionSchema = new Schema({
  emoji: { type: String, required: true }, // e.g., '👍', '❤️', '😂'
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { _id: false });

const messageSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  replyTo: { type: Schema.Types.ObjectId, ref: 'Message' },

  roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true , index: true},
  chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter', index: true},
  topicId: { type: Schema.Types.ObjectId, ref: 'Topic', index: true},

  messageType: {
    type: String,
    enum: ['text', 'code', 'link'],
    default: 'text'
  },

  reactions: [reactionSchema],

  isEdited: { type: Boolean, default: false },
  isPinned: { type: Boolean, default: false },
}, {timestamps: true});

export const Message = model("Message", messageSchema);