const supabase = require('../config/supabase');

/**
 * Service to interact with Supabase PostgreSQL for calendars (User-Scoped)
 */
class CalendarService {
  static async saveCalendar(calendarData, userId = null) {
    if (!supabase) {
      throw new Error('Supabase client is not configured.');
    }

    const {
      businessName,
      businessType,
      product,
      audience,
      platform,
      goal,
      tone,
      days,
      calendar
    } = calendarData;

    const payload = {
      business_name: businessName,
      business_type: businessType || '',
      product: product || '',
      audience: audience || '',
      platform: platform || 'Instagram',
      goal: goal || '',
      tone: tone || 'Professional',
      days: parseInt(days, 10) || 7,
      calendar: calendar || [],
      ...(userId ? { user_id: userId } : {})
    };

    const { data, error } = await supabase
      .from('calendars')
      .insert([payload])
      .select();

    if (error) {
      console.error('❌ Supabase Save Error:', error);
      throw new Error(`Database insert failed: ${error.message}`);
    }

    return data[0];
  }

  static async getAllCalendars(userId = null) {
    if (!supabase) {
      throw new Error('Supabase client is not configured.');
    }

    let query = supabase
      .from('calendars')
      .select('*')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('❌ Supabase Fetch Error:', error);
      throw new Error(`Failed to fetch calendars: ${error.message}`);
    }

    return data || [];
  }

  static async getCalendarById(id, userId = null) {
    if (!supabase) {
      throw new Error('Supabase client is not configured.');
    }

    let query = supabase
      .from('calendars')
      .select('*')
      .eq('id', id);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query.single();

    if (error) {
      console.error(`❌ Supabase Fetch By ID (${id}) Error:`, error);
      throw new Error(`Calendar not found: ${error.message}`);
    }

    return data;
  }

  static async deleteCalendar(id, userId = null) {
    if (!supabase) {
      throw new Error('Supabase client is not configured.');
    }

    let query = supabase
      .from('calendars')
      .delete()
      .eq('id', id);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { error } = await query;

    if (error) {
      console.error(`❌ Supabase Delete (${id}) Error:`, error);
      throw new Error(`Failed to delete calendar: ${error.message}`);
    }

    return { success: true, id };
  }
}

module.exports = CalendarService;
