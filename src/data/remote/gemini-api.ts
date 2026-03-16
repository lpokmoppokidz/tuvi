import { GoogleGenAI } from "@google/genai";

export const generateGeminiResponse = async (userMsg: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: userMsg,
    config: {
      systemInstruction: "Bạn là một chuyên gia Tử Vi Việt Nam cao cấp. Hãy trả lời người dùng một cách thông thái, sử dụng các thuật ngữ chuyên môn tử vi nhưng vẫn dễ hiểu. Luôn giữ thái độ tích cực và hỗ trợ.",
    }
  });
  
  return response.text;
};
