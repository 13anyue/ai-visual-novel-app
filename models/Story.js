import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  chapters: [
    {
      chapterId: String,
      title: String,
      scenes: [
        {
          sceneId: String,
          narration: String,
          background: mongoose.Schema.Types.ObjectId,
          characters: [mongoose.Schema.Types.ObjectId],
          dialogue: [
            {
              character: mongoose.Schema.Types.ObjectId,
              text: String,
              emotion: String
            }
          ],
          choices: [
            {
              text: String,
              nextScene: String,
              consequences: [String]
            }
          ]
        }
      ]
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

export default mongoose.model('Story', storySchema);
