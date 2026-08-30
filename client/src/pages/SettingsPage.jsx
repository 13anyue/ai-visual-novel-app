import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SettingsPage.css';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    apiProvider: 'openai',
    apiKey: '',
    apiUrl: 'https://api.openai.com/v1',
    model: 'gpt-3.5-turbo',
    maxTokens: 2000,
    temperature: 0.7
  });

  const [message, setMessage] = useState('');
  const userId = 'user-123'; // 应该从认证系统获取

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: name === 'maxTokens' || name === 'temperature' ? parseFloat(value) : value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/settings/${userId}`,
        settings
      );
      setMessage('✅ 设置已保存！');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ 保存失败，请重试');
      console.error('保存设置失败:', error);
    }
  };

  const handleTest = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/settings/${userId}/test`,
        settings
      );
      setMessage(response.data.message);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ 连接失败');
      console.error('测试连接失败:', error);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1>⚙️ API 设置</h1>

        <div className="settings-form">
          <div className="form-group">
            <label>AI 服务提供商</label>
            <select
              name="apiProvider"
              value={settings.apiProvider}
              onChange={handleInputChange}
            >
              <option value="openai">OpenAI</option>
              <option value="claude">Claude</option>
              <option value="custom">自定义</option>
            </select>
          </div>

          <div className="form-group">
            <label>API Key</label>
            <input
              type="password"
              name="apiKey"
              value={settings.apiKey}
              onChange={handleInputChange}
              placeholder="输入您的 API Key"
            />
          </div>

          <div className="form-group">
            <label>API URL</label>
            <input
              type="text"
              name="apiUrl"
              value={settings.apiUrl}
              onChange={handleInputChange}
              placeholder="输入 API 地址"
            />
          </div>

          <div className="form-group">
            <label>模型</label>
            <input
              type="text"
              name="model"
              value={settings.model}
              onChange={handleInputChange}
              placeholder="输入模型名称"
            />
          </div>

          <div className="form-group">
            <label>最大 Token 数</label>
            <input
              type="number"
              name="maxTokens"
              value={settings.maxTokens}
              onChange={handleInputChange}
              min="100"
              max="4000"
            />
          </div>

          <div className="form-group">
            <label>温度 (0-2)</label>
            <input
              type="number"
              name="temperature"
              value={settings.temperature}
              onChange={handleInputChange}
              min="0"
              max="2"
              step="0.1"
            />
          </div>

          {message && <div className="message">{message}</div>}

          <div className="button-group">
            <button onClick={handleSave} className="btn-primary">
              💾 保存设置
            </button>
            <button onClick={handleTest} className="btn-secondary">
              🔗 测试连接
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
