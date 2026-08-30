import mongoose from 'mongoose';

const apiSettingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  apiProvider: {
    type: String,
    enum: ['openai', 'claude', 'custom'],
    default: 'openai'
  },
  apiKey: {
    type: String,
    required: true
  },
  apiUrl: {
    type: String,
    default: 'https://api.openai.com/v1'
  },
  model: {
    type: String,
    default: 'gpt-3.5-turbo'
  },
  maxTokens: {
    type: Number,
    default: 2000
  },
  temperature: {
    type: Number,
    default: 0.7,
    min: 0,
    max: 2
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

export default mongoose.model('ApiSettings', apiSettingsSchema);
