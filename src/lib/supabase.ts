import { createClient } from '@supabase/supabase-js';
import { Intensity, SessionRecord } from './types.js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase: any = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

/**
 * Checks if Supabase is configured with the required environment variables.
 * Logs a warning if configuration is missing.
 * 
 * @returns {boolean} True if Supabase is configured, false otherwise.
 */
function checkSupabaseConfig(): boolean {
  if (!supabase) {
    console.warn('Supabase not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables to enable analytics.');
    return false;
  }
  return true;
}

/**
 * Inserts a Pomodoro session record into the Supabase 'sessions' table.
 * 
 * @param {SessionRecord} record - The session record to insert.
 * @returns {Promise<void>}
 */
export async function insertSessionRecord(record: SessionRecord): Promise<void> {
    if (!checkSupabaseConfig()) return;
    
    const { error } = await supabase.from('sessions').insert(record);
    if (error) {
        console.error('Error inserting session record:', error);
    }
}

/**
 * Fetches all Pomodoro session records from the Supabase 'sessions' table.
 * Records are ordered by creation date (most recent first).
 * 
 * @returns {Promise<SessionRecord[]>} Array of session records, or empty array on error.
 */
export async function fetchSessionRecords(): Promise<SessionRecord[]> {
    if (!checkSupabaseConfig()) return [];
    
    const { data, error } = await supabase.from('sessions').select('*').order('created_at', { ascending: false });
    if (error) {
        console.error('Error fetching session records:', error);
        return [];
    }
    
    return data as SessionRecord[];
}
