import {Command} from '@oclif/core';
import {showAnalytics} from '../lib/analytis.js';

/**
 * Command to display analytics for completed Pomodoro sessions.
 * 
 * This command fetches and displays statistics about the user's Pomodoro usage.
 * 
 * @example
 * $ promo analytics
 */
export default class Analytics extends Command {
  /**
   * Description shown in CLI help.
   */
  static description = 'Display analytics for your Pomodoro sessions';

  /**
   * Executes the analytics command.
   * Calls the showAnalytics function to display session statistics.
   * 
   * @returns {Promise<void>}
   */
  async run(): Promise<void> {
    // Display analytics to the user
    await showAnalytics();
  }
}
