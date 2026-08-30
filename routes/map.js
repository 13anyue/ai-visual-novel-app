import express from 'express';
import Map from '../models/Map.js';

const router = express.Router();

// 获取所有地图
router.get('/:projectId', async (req, res) => {
  try {
    const maps = await Map.find({ projectId: req.params.projectId });
    res.json(maps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 创建新地图
router.post('/:projectId', async (req, res) => {
  try {
    const { name, description, width, height, backgroundImage } = req.body;
    const map = new Map({
      projectId: req.params.projectId,
      name,
      description,
      width,
      height,
      backgroundImage,
      locations: []
    });
    await map.save();
    res.status(201).json(map);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 更新地图
router.put('/:projectId/:mapId', async (req, res) => {
  try {
    const map = await Map.findByIdAndUpdate(
      req.params.mapId,
      req.body,
      { new: true }
    );
    res.json(map);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 添加位置点
router.post('/:projectId/:mapId/location', async (req, res) => {
  try {
    const { name, x, y, description } = req.body;
    const map = await Map.findById(req.params.mapId);
    
    const location = {
      id: Date.now().toString(),
      name,
      x,
      y,
      description,
      connectedTo: []
    };
    
    map.locations.push(location);
    await map.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
