const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY || '';

let aiClient = null;

if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
    console.log('✨ Google GenAI client initialized.');
  } catch (err) {
    console.error('❌ Failed to initialize Google GenAI client:', err.message);
  }
} else {
  console.warn('⚠️ GEMINI_API_KEY missing. AI generation will fail until .env is configured.');
}

module.exports = {
  aiClient,
  MODEL_NAME: process.env.GEMINI_MODEL || 'gemini-2.0-flash'
};
