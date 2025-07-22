import { Schema, model } from "mongoose";
/*
{
  "_id": "ObjectId",                             // Unique identifier for the resource

  "resourceType": "\"Youtube\" | \"Document\" | \"Custom\" | \"Text\"",  
                                                // Type of resource - helps with UI rendering and validation
  "resourceTitle": "String",                     // Title of the resource for display
  "description": "String",                       // Brief summary or explanation of the resource
  "language": "String",                          // Content language code (e.g., 'en', 'fr')
  "timeToReadOrWatch": "Number",                 // Estimated duration in minutes/seconds
  "url": "String",                               // Link for Youtube/Document/Custom resources
  "externalResourceLogoLink": "String",          // URL to thumbnail or logo (optional)
  "text": "String",                              // Actual text content, if resourceType is 'Text'
ratings: {
  useful: Number,
  recommended: Number,
  average: Number,   // Optional, calculated from multiple scores
  count: Number      // Number of users who rated
}
"comments": ["ObjectId"],                       // References to comments on this resource
  "viewCount": "Number",                          // How many times the resource has been viewed
  "difficulty": "\"easy\" | \"medium\" | \"hard\"",  
                                               // Difficulty level of the resource
  "tags": ["String"],                            // List of keywords to facilitate search and filtering
  "createdAt": "Date",                           // When the resource was created
  "updatedAt": "Date"                            // Last update timestamp
}




*/

const resourceSchema = new Schema({
  resourceType: {
    type: String,
    enum: ['Youtube', 'Document', 'Custom', 'Text'],
    required: true
  },
  resourceTitle: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  language: {
    type: String,
    default: 'en'
  },
  timeToReadOrWatch: {
    type: Number, // duration in minutes or seconds
    min: 0
  },
  resourceExternalUrl: {
    type: String
  },
  externalResourceLogoLink: {
    type: String
  },
  manualText: {
    type: String // Only applicable if resourceType === 'Text'
  },
  ratings: {
    useful: { type: Number, default: 0 },
    recommended: { type: Number, default: 0 },
    average: { type: Number, default: 0 }, // Can be calculated with middleware/hooks
    count: { type: Number, default: 0 }
  },
  //TODO: Modify This
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }
  ],
  viewCount: {
    type: Number,
    default: 0
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  tags: [
    {
      type: String,
      index: true,
    }
  ]
}, { timestamps: true });


export const Resource = model("Resource", resourceSchema);
