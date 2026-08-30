import mongoose from 'mongoose';

const npcSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: String,
  age: Number,
  gender: String,
  background: String,
  personality: String,
  relationships: [
    {
      npcId: mongoose.Schema.Types.ObjectId,
      relationshipType: String,
      description: String
    }
  ],
  dialogue: [
    {
      context: String,
      lines: [String]
    }
  ],
  memories: [
    {
      event: String,
      importance: {
        type: Number,
        default: 1
      },
      timestamp: Date
    }
  ],
  traits: [String],
  likes: [String],
  dislikes: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('NPC', npcSchema);
