import express from 'express';
import Prompt from '../models/Prompt.js';

const router = express.Router();

// 获取所有提示词
router.get('/:projectId', async (req, res) => {
  try {
    const prompts = await Prompt.find({ projectId: req.params.projectId, isActive: true });
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 创建新提示词
router.post('/:projectId', async (req, res) => {
  try {
    const { name, description, content, type, variables, regexPatterns, presets } = req.body;
    const prompt = new Prompt({
      projectId: req.params.projectId,
      name,
      description,
      content,
      type,
      variables,
      regexPatterns,
      presets,
      isActive: true
    });
    await prompt.save();
    res.status(201).json(prompt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 应用正则表达式处理提示词
router.post('/:projectId/:promptId/apply-regex', async (req, res) => {
  try {
    const { input } = req.body;
    const prompt = await Prompt.findById(req.params.promptId);
    
    let result = prompt.content;
    
    for (const regex of prompt.regexPatterns) {
      const pattern = new RegExp(regex.pattern, 'g');
      result = result.replace(pattern, regex.replacement);
    }
    
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 使用预设
router.post('/:projectId/:promptId/apply-preset', async (req, res) => {
  try {
    const { presetName, variables } = req.body;
    const prompt = await Prompt.findById(req.params.promptId);
    
    let result = prompt.content;
    
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, value);
    }
    
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
