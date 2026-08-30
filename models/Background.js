import mongoose from 'mongoose';

const backgroundSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  imageUrl: {
    type: String,
    required: true
  },
  tags: [String],
  category: {
    type: String,
    enum: ['indoor', 'outdoor', 'urban', 'nature', 'fantasy', 'other']
  },
  mood: {
    type: String,
    enum: ['bright', 'dark', 'calm', 'tense', 'romantic']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Background', backgroundSchema);
