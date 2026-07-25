/**
 * Startup Validation Utility
 * Checks for required environment variables on backend initialization.
 */
function validateEnv() {
  const requiredVars = [
    { key: 'GEMINI_API_KEY', label: 'Google Gemini API Key' },
    { key: 'SUPABASE_URL', label: 'Supabase Project URL' },
    { key: 'SUPABASE_ANON_KEY', label: 'Supabase Anonymous Key' },
  ];

  const missing = requiredVars.filter((v) => !process.env[v.key] || process.env[v.key].trim() === '');

  if (missing.length > 0) {
    console.warn('\n=============================================================');
    console.warn('⚠️  ENVIRONMENT CONFIGURATION WARNING');
    console.warn('=============================================================');
    console.warn('The following required environment variable(s) are missing:');
    missing.forEach((item) => {
      console.warn(`  - ${item.key} (${item.label})`);
    });
    console.warn('\nPlease ensure your .env file in the server directory contains these variables.');
    console.warn('Refer to .env.example for template structure.');
    console.warn('=============================================================\n');
    return false;
  }

  console.log('✅ Environment configuration validated successfully.');
  return true;
}

module.exports = { validateEnv };
