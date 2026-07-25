const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { validateEnv } = require('./utils/startupValidation');
const authRoutes = require('./routes/authRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Run startup environment validation
validateEnv();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: {
      geminiConfigured: !!process.env.GEMINI_API_KEY,
      supabaseConfigured: !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY)
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', calendarRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found.` });
});

// Global Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 AI Social Media Server running on port ${PORT}`);
  console.log(`🌐 Health check available at http://localhost:${PORT}/api/health`);
});
