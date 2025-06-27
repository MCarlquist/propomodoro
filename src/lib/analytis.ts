import TerminalKit from 'terminal-kit';
import { fetchSessionRecords } from './supabase.js';
import { Intensity, SessionRecord } from './types.js';

const term = TerminalKit.terminal;

/**
 * Formats a duration in milliseconds into a human-readable string.
 * Example: 7260000 ms -> "2h:1min"
 * @param ms - Duration in milliseconds
 * @returns {string} Formatted duration string
 */
function formatDuration(ms: number): string {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return `${h > 0 ? h + 'h:' : ''}${m}min`;
}

/**
 * Displays analytics for Pomodoro sessions in a terminal table.
 * Fetches session records, calculates total time, and allows navigation through sessions.
 * Uses TerminalKit for interactive terminal UI.
 * 
 * - Arrow keys: Navigate through paginated session records
 * - 'q' or Ctrl+C: Exit analytics view
 * 
 * @returns {Promise<void>}
 */
export async function showAnalytics(): Promise<void> {
    term.clear();
    term.bold.cyan('Pomodoro Analytics\n\n');
    
    // Fetch all session records from the database
    const sessions = await fetchSessionRecords();

    // Calculate total time spent across all sessions
    const totalMS: number = sessions.reduce(
        (acc: number, cur: SessionRecord): number => acc + (cur.durationMS || 0),
        0
    );

    // Display total time at the top
    term.moveTo('center');
    term.bold.cyan(`Total Time: ${formatDuration(totalMS)}\n\n`);

    // Prepare table header and rows for display
    const header = ['Task', 'Intensity', 'Completed', 'Duration'];
    const rows = sessions.map((s) => [
        s.task.slice(0, 30) + (s.task.length > 30 ? '...' : ''),
        s.intensity,
        s.completed ? 'Yes' : 'No',
        formatDuration(s.durationMS || 0),
    ]);

    // Pagination variables
    const pageSize = 10;
    let pageIndex = 0;

    /**
     * Draws the analytics table for the current page.
     */
    function drawTable() {
        term.clear();
        term.bold.cyan('Pomodoro Analytics\n\n');
        term.bold.magenta(`Total Time: ${formatDuration(totalMS)}\n\n`);

        term.bold(header.join(' | '));
        const start = pageIndex * pageSize;
        const end = start + pageSize;
        rows.slice(start, end).forEach((row) => {
            term(row.join(' | ') + '\n');
        });
        term.green('\nUse arrow keys to navigate, q to quit.\n');
    }

    drawTable();

    // Enable keyboard input for navigation
    term.grabInput({ mouse: 'button' });
    term.on('key', (name: string) => {
        // Navigate up a page
        if (name === 'UP' && pageIndex > 0) {
            pageIndex--;
            drawTable();
        // Navigate down a page
        } else if ( name === 'DOWN' && ( pageIndex + 1 ) * pageSize < rows.length) {
            pageIndex++;
            drawTable();
        // Quit analytics view
        } else if (name === 'q' || name === 'CTRL_C') {
            term.grabInput(false);
            term.clear();
            term.bold.cyan('Exiting Analytics...\n');
            term.processExit(0);
        }
    });
};