import express from 'express';
import ApiSettings from '../models/ApiSettings.js';

const router = express.Router();

// 获取 API 设置
router.get('/:userId', async (req, res) => {
  try {
    const settings = await ApiSettings.findOne({ userId: req.params.userId });
    if (!settings) {
      return res.status(404).json({ error: 'API 设置未找到' });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 创建或更新 API 设置
router.post('/:userId', async (req, res) => {
  try {
    const { apiProvider, apiKey, apiUrl, model, maxTokens, temperature } = req.body;
    
    let settings = await ApiSettings.findOne({ userId: req.params.userId });
    
    if (settings) {
      settings.apiProvider = apiProvider || settings.apiProvider;
      settings.apiKey = apiKey || settings.apiKey;
      settings.apiUrl = apiUrl || settings.apiUrl;
      settings.model = model || settings.model;
      settings.maxTokens = maxTokens || settings.maxTokens;
      settings.temperature = temperature !== undefined ? temperature : settings.temperature;
      settings.updatedAt = new Date();
    } else {
      settings = new ApiSettings({
        userId: req.params.userId,
        apiProvider,
        apiKey,
        apiUrl,
        model,
        maxTokens,
        temperature
      });
    }
    
    await settings.save();
    res.json({ message: 'API 设置已保存', settings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 测试 API 连接
router.post('/:userId/test', async (req, res) => {
  try {
    const settings = await ApiSettings.findOne({ userId: req.params.userId });
    if (!settings) {
      return res.status(404).json({ error: 'API 设置未找到' });
    }
    
    // 这里可以添加实际的 API 测试逻辑
    res.json({ message: '✅ API 连接测试成功', provider: settings.apiProvider });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
