const { generateCalendarAI } = require('../services/geminiService');
const CalendarService = require('../services/calendarService');

/**
 * Controller for Calendar Endpoints
 */
const generateCalendar = async (req, res, next) => {
  try {
    const { businessName, platform, tone, days = 7 } = req.body;

    if (!businessName || !businessName.trim()) {
      return res.status(400).json({ error: 'Business Name is required.' });
    }

    if (!platform) {
      return res.status(400).json({ error: 'Platform is required.' });
    }

    if (!tone) {
      return res.status(400).json({ error: 'Tone is required.' });
    }

    const calendar = await generateCalendarAI(req.body);

    res.status(200).json({
      success: true,
      data: calendar,
      meta: req.body
    });
  } catch (error) {
    next(error);
  }
};

const saveCalendar = async (req, res, next) => {
  try {
    const { businessName, calendar } = req.body;
    const userId = req.user ? req.user.id : null;

    if (!businessName || !calendar) {
      return res.status(400).json({ error: 'Missing required calendar fields for saving.' });
    }

    const savedRecord = await CalendarService.saveCalendar(req.body, userId);

    res.status(201).json({
      success: true,
      data: savedRecord
    });
  } catch (error) {
    next(error);
  }
};

const getAllCalendars = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;
    const calendars = await CalendarService.getAllCalendars(userId);
    res.status(200).json({
      success: true,
      count: calendars.length,
      data: calendars
    });
  } catch (error) {
    next(error);
  }
};

const getCalendarById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user ? req.user.id : null;
    const calendar = await CalendarService.getCalendarById(id, userId);
    res.status(200).json({
      success: true,
      data: calendar
    });
  } catch (error) {
    next(error);
  }
};

const deleteCalendar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user ? req.user.id : null;
    const result = await CalendarService.deleteCalendar(id, userId);
    res.status(200).json({
      success: true,
      message: 'Calendar deleted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateCalendar,
  saveCalendar,
  getAllCalendars,
  getCalendarById,
  deleteCalendar
};
