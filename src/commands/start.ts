import {Command, Flags} from '@oclif/core';
import {promptIntensity, promptTask, promptConfirm} from '../lib/prompt.js';
import {Timer} from '../lib/timer.js';
import {notifySessionComplete} from '../lib/notifications.js';
import {insertSessionRecord} from '../lib/supabase.js';
import {Intensity} from '../lib/types.js';

/**
 * Command to start a Pomodoro timer session.
 * 
 * Allows the user to select an intensity level and specify a task.
 * Handles timer countdown, user notifications, and session recording.
 * 
 * @example
 * $ promo start --intensity=medium
 */
export default class Start extends Command {
  /**
   * Description shown in CLI help.
   */
  static description = 'Start a Pomodoro timer session with adjustable intensity';

  /**
   * CLI flags for the command.
   */
  static flags = {
    intensity: Flags.string({
      options: ['low', 'medium', 'high'],
      description: 'Work intensity level',
      required: false,
    }),
  };

  /**
   * Runs the Pomodoro timer session.
   * Handles user prompts, timer logic, notifications, and session persistence.
   * 
   * @returns {Promise<void>}
   */
  async run(): Promise<void> {
    const {flags} = await this.parse(Start);

    // Prompt for intensity if not provided via flag
    let intensity: Intensity = (flags.intensity as Intensity) || (await promptIntensity());

    // Prompt user for the focus task
    const task = await promptTask();

    // Confirm session start with user
    const confirmed = await promptConfirm(intensity, task);
    if (!confirmed) {
      this.log('Session cancelled.');
      return;
    }

    /**
     * Map intensity to session duration in milliseconds.
     * - low: 20 minutes
     * - medium: 40 minutes
     * - high: 75 minutes
     */
    const durations: Record<Intensity, number> = {
      low: 20 * 60 * 1000,
      medium: 40 * 60 * 1000,
      high: 75 * 60 * 1000,
    };
    const durationMs = durations[intensity];

    this.log(`Starting a ${intensity} intensity session for task: "${task}"`);

    // Initialize timer with the selected duration
    const timer = new Timer(durationMs);

    // Display remaining time on each tick
    timer.onTick(({minutes, seconds}: {minutes: number, seconds: number}) => {
      process.stdout.write(`\rTime remaining: ${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}   `);
    });

    // Handle timer completion: notify, log, and record session
    timer.onComplete(async () => {
      process.stdout.write('\n');
      notifySessionComplete(task);
      this.log(`Congrats! You completed task "${task}". Remember to hydrate and stretch.`);
      await insertSessionRecord({task, intensity, completed: true, durationMS: durationMs});
      // Optionally, prompt for next steps (continue or break)
      process.exit(0);
    });

    // Start the timer countdown
    timer.start();

    // Listen for user keypresses:
    // - 'r': show remaining time
    // - Ctrl+C: exit
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
