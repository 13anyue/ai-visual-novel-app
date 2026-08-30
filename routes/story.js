import express from 'express';
import Story from '../models/Story.js';

const router = express.Router();

// 获取所有故事
router.get('/:projectId', async (req, res) => {
  try {
    const stories = await Story.find({ projectId: req.params.projectId });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 创建新故事
router.post('/:projectId', async (req, res) => {
  try {
    const { title, description } = req.body;
    const story = new Story({
      projectId: req.params.projectId,
      title,
      description,
      chapters: []
    });
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 添加章节
router.post('/:projectId/:storyId/chapter', async (req, res) => {
  try {
    const { title } = req.body;
    const story = await Story.findById(req.params.storyId);
    
    const chapter = {
      chapterId: Date.now().toString(),
      title,
      scenes: []
    };
    
    story.chapters.push(chapter);
    await story.save();
    res.status(201).json(chapter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
