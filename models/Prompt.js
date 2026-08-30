import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['system', 'dialogue', 'narration', 'worldbuilding'],
    default: 'system'
  },
  variables: [String], // 可用的变量列表
  regexPatterns: [
    {
      pattern: String,
      replacement: String,
      description: String
    }
  ],
  presets: [
    {
      name: String,
      values: mongoose.Schema.Types.Mixed
    }
  ],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Prompt', promptSchema);
