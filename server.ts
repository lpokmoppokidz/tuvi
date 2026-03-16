import express from 'express';
import { GoogleGenAI } from '@google/genai';
import { TUVI_SYSTEM_PROMPT } from './src/data/constants/tuvi-prompts';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// CORS middleware for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.post('/api/tuvi/calculate', async (req, res) => {
  const { ho_ten, ngay_sinh, loai_lich, gio_sinh, gioi_tinh, ngay_du_doan } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const userPrompt = `INPUT
Họ tên: ${ho_ten}
Ngày sinh: ${ngay_sinh} (${loai_lich})
Giờ sinh: ${gio_sinh}
Giới tính: ${gioi_tinh}
Ngày cần dự đoán: ${ngay_du_doan}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: userPrompt,
      config: {
        systemInstruction: TUVI_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text ?? '';
    console.log('Gemini raw response:', text.substring(0, 500));

    const data = JSON.parse(text);
    return res.json(data);
  } catch (error: any) {
    console.error('Error calculating Tu Vi chart:', error?.message || error);
    return res.status(500).json({ 
      error: 'Failed to calculate chart', 
      details: error?.message || 'Unknown error' 
    });
  }
});

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Tu Vi API server running at http://localhost:${PORT}`);
});
