const supabase = require('../config/supabase');

/**
 * Controller for User Authentication using Supabase Auth
 */
const signup = async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email address is required.' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    if (!supabase) {
      return res.status(500).json({ error: 'Supabase client is not initialized.' });
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        data: {
          full_name: fullName || ''
        }
      }
    });

    if (error) {
      console.error('❌ Supabase Signup Error:', error.message);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      user: data.user,
      session: data.session
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and Password are required.' });
    }

    if (!supabase) {
      return res.status(500).json({ error: 'Supabase client is not initialized.' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password
    });

    if (error) {
      console.error('❌ Supabase Login Error:', error.message);
      return res.status(401).json({ error: error.message });
    }

    res.status(200).json({
      success: true,
      message: 'Logged in successfully!',
      user: data.user,
      token: data.session?.access_token,
      session: data.session
    });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};

module.exports = {
  signup,
  login,
  getMe
};
