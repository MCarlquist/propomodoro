import TerminalKit from 'terminal-kit';
import { fetchSessionRecords } from './supabase.js';
import { Intensity, SessionRecord } from './types.js';

const term = TerminalKit.terminal;

/**
 * Format total duration ms into "HHh:MMmin" string
 * @param ms - milliseconds
 */
function formatDuration(ms: number): string {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return `${h > 0 ? h + 'h:' : ''}${m}min`;
}

export async function showAnalytics(): Promise<void> {
    term.clear();
    term.bold.cyan('Pomodoro Analytics\n\n');
    
    const sessions = await fetchSessionRecords();

    interface SessionAccumulator {
        acc: number;
        cur: SessionRecord;
    }

    const totalMS: number = sessions.reduce(
        (acc: number, cur: SessionRecord): number => acc + (cur.durationMS || 0),
        0
    );

    term.moveTo('center');
    term.bold.cyan(`Total Time: ${formatDuration(totalMS)}\n\n`);

    // Prepare table header and rows
    const header = ['Task', 'Intensity', 'Completed', 'Duration'];
    const rows = sessions.map((s) => [
        s.task.slice(0, 30) + (s.task.length > 30 ? '...' : ''),
        s.intensity,
        s.completed ? 'Yes' : 'No',
        formatDuration(s.durationMS || 0),
    ]);

    // Draw table with arrow navigation ( simple scroll )

    const pageSize = 10;
    let pageIndex = 0;

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

    term.grabInput({ mouse: 'button' });
    term.on('key', (name: string) => {
        if (name === 'UP' && pageIndex > 0) {
            pageIndex--;
            drawTable();
        } else if ( name === 'DOWN' && ( pageIndex + 1 ) * pageSize < rows.length) {
            pageIndex++;
            drawTable();
        } else if (name === 'q' || name === 'CTRL_C') {
            term.grabInput(false);
            term.clear();
            term.bold.cyan('Exiting Analytics...\n');
            term.processExit(0);
        }
    });
};