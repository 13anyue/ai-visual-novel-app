import express from 'express';
import NPC from '../models/NPC.js';

const router = express.Router();

// 获取所有 NPC
router.get('/:projectId', async (req, res) => {
  try {
    const npcs = await NPC.find({ projectId: req.params.projectId });
    res.json(npcs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取单个 NPC
router.get('/:projectId/:npcId', async (req, res) => {
  try {
    const npc = await NPC.findById(req.params.npcId);
    if (!npc) return res.status(404).json({ error: 'NPC 未找到' });
    res.json(npc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 创建新 NPC
router.post('/:projectId', async (req, res) => {
  try {
    const { name, avatar, age, gender, background, personality, traits, likes, dislikes } = req.body;
    const npc = new NPC({
      projectId: req.params.projectId,
      name,
      avatar,
      age,
      gender,
      background,
      personality,
      traits,
      likes,
      dislikes,
      relationships: [],
      dialogue: [],
      memories: []
    });
    await npc.save();
    res.status(201).json(npc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 更新 NPC
router.put('/:projectId/:npcId', async (req, res) => {
  try {
    const npc = await NPC.findByIdAndUpdate(
      req.params.npcId,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json(npc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 添加记忆
router.post('/:projectId/:npcId/memory', async (req, res) => {
  try {
    const { event, importance } = req.body;
    const npc = await NPC.findById(req.params.npcId);
    
    npc.memories.push({
      event,
      importance,
      timestamp: new Date()
    });
    
    await npc.save();
    res.status(201).json(npc.memories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
