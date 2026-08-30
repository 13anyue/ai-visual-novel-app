import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// 导入路由
import apiSettingsRouter from './routes/apiSettings.js';
import mapRouter from './routes/map.js';
import npcRouter from './routes/npc.js';
import backgroundRouter from './routes/background.js';
import promptRouter from './routes/prompt.js';
import storyRouter from './routes/story.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 中间件
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 数据库连接
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-visual-novel')
  .then(() => console.log('✅ MongoDB 连接成功'))
  .catch(err => console.error('❌ MongoDB 连接失败:', err));

// API 路由
app.use('/api/settings', apiSettingsRouter);
app.use('/api/map', mapRouter);
app.use('/api/npc', npcRouter);
app.use('/api/background', backgroundRouter);
app.use('/api/prompt', promptRouter);
app.use('/api/story', storyRouter);

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: '✅ 服务器运行正常' });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '服务器内部错误' });
});

app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
});
