const express = require('express');
const router = express.Router();
const {
  generateCalendar,
  saveCalendar,
  getAllCalendars,
  getCalendarById,
  deleteCalendar
} = require('../controllers/calendarController');
const { requireAuth } = require('../middleware/authMiddleware');

// AI Calendar Generation (Accessible)
router.post('/generate', generateCalendar);

// Protected Supabase User Operations (Requires Auth Token)
router.post('/calendars', requireAuth, saveCalendar);
router.get('/calendars', requireAuth, getAllCalendars);
router.get('/calendars/:id', requireAuth, getCalendarById);
router.delete('/calendars/:id', requireAuth, deleteCalendar);

module.exports = router;
