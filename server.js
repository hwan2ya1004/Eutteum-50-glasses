// server.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

// Pixabay API 프록시 엔드포인트
app.get('/api/images', async (req, res) => {
    const query = req.query.q || 'fashion';
    const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=5`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("API 요청 오류:", error);
        res.status(500).json({ error: 'API 요청 중 오류가 발생했습니다.' });
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
