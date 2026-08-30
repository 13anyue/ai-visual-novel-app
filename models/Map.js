import mongoose from 'mongoose';

const mapSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  width: {
    type: Number,
    default: 1200
  },
  height: {
    type: Number,
    default: 800
  },
  backgroundImage: String,
  locations: [
    {
      id: String,
      name: String,
      x: Number,
      y: Number,
      radius: {
        type: Number,
        default: 30
      },
      description: String,
      connectedTo: [String] // 连接到其他位置的ID
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Map', mapSchema);
