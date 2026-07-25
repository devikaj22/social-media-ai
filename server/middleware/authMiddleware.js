const supabase = require('../config/supabase');

/**
 * Authentication Middleware
 * Validates Supabase JWT Bearer token from Authorization header.
 */
const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required. Please log in to proceed.' });
    }

    const token = authHeader.split(' ')[1];

    if (!token || token === 'undefined' || token === 'null') {
      return res.status(401).json({ error: 'Invalid or missing authentication token.' });
    }

    if (!supabase) {
      return res.status(500).json({ error: 'Supabase auth service is not configured.' });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Session expired or invalid token. Please log in again.' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('❌ Auth Middleware Error:', err.message);
    return res.status(401).json({ error: 'Authentication failed.' });
  }
};

module.exports = { requireAuth };
