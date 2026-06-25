const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

let supabase = null;
let isConfigured = false;

if (
  supabaseUrl && 
  supabaseKey && 
  supabaseUrl !== 'https://placeholder-project.supabase.co' && 
  supabaseKey !== 'placeholder-service-role-key-123456'
) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false
      }
    });
    isConfigured = true;
    console.log('Supabase client successfully initialized!');
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error.message);
  }
} else {
  console.warn('WARNING: Supabase is NOT configured. Server will run in MOCK mode for data operations.');
}

module.exports = {
  supabase,
  isConfigured
};
