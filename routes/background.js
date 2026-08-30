import express from 'express';
import Background from '../models/Background.js';

const router = express.Router();

// 获取所有背景
router.get('/:projectId', async (req, res) => {
  try {
    const backgrounds = await Background.find({ projectId: req.params.projectId });
    res.json(backgrounds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 创建新背景
router.post('/:projectId', async (req, res) => {
  try {
    const { name, description, imageUrl, tags, category, mood } = req.body;
    const background = new Background({
      projectId: req.params.projectId,
      name,
      description,
      imageUrl,
      tags,
      category,
      mood
    });
    await background.save();
    res.status(201).json(background);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 按标签搜索背景
router.get('/:projectId/search/:tag', async (req, res) => {
  try {
    const backgrounds = await Background.find({
      projectId: req.params.projectId,
      tags: req.params.tag
    });
    res.json(backgrounds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
