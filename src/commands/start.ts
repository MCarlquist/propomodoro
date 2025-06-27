import {Command, Flags} from '@oclif/core';
import {promptIntensity, promptTask, promptConfirm} from '../lib/prompt.js';
import {Timer} from '../lib/timer.js';
import {notifySessionComplete} from '../lib/notifications.js';
import {insertSessionRecord} from '../lib/supabase.js';
import {Intensity} from '../lib/types.js';

/**
 * Starts a Pomodoro session with adjustable intensity and task.
 */
export default class Start extends Command {
  static description = 'Start a Pomodoro timer session with adjustable intensity';

  static flags = {
    intensity: Flags.string({
      options: ['low', 'medium', 'high'],
      description: 'Work intensity level',
      required: false,
    }),
  };

  async run() {
    const {flags} = await this.parse(Start);
    // Prompt intensity if not provided
    let intensity: Intensity = (flags.intensity as Intensity) || (await promptIntensity());

    // Prompt user for focus task
    const task = await promptTask();

    // Confirm start
    const confirmed = await promptConfirm(intensity, task);
    if (!confirmed) {
      this.log('Session cancelled.');
      return;
    }

    // Map intensity to duration (ms)
    const durations: Record<Intensity, number> = {
      low: 20 * 60 * 1000,
      medium: 40 * 60 * 1000,
      high: 75 * 60 * 1000,
    };
    const durationMs = durations[intensity];

    this.log(`Starting a ${intensity} intensity session for task: "${task}"`);

    const timer = new Timer(durationMs);

    timer.onTick(({minutes, seconds}: {minutes: number, seconds: number}) => {
      process.stdout.write(`\rTime remaining: ${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}   `);
    });

    timer.onComplete(async () => {
      process.stdout.write('\n');
      notifySessionComplete(task);
      this.log(`Congrats! You completed task "${task}". Remember to hydrate and stretch.`);
      await insertSessionRecord({task, intensity, completed: true, durationMS: durationMs});
      // Could prompt next steps here (continue or break)
      process.exit(0);
    });

    timer.start();

    // Listen for user keypress 'r' to show remaining time (example)
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', (key) => {
      if (key.toString() === 'r') {
        const remaining = timer.getRemaining();
        this.log(`\nRemaining time: ${Math.floor(remaining / 60000)} minutes`);
      }
      if (key.toString() === '\u0003') { // Ctrl+C
        this.log('\nExiting...');
        process.exit(0);
      }
    });
  }
}
