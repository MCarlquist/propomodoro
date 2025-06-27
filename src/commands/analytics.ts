import {Command} from '@oclif/core';
import {showAnalytics} from '../lib/analytis.js';

/**
 * Shows analytics for completed Pomodoro sessions.
 */
export default class Analytics extends Command {
  static description = 'Display analytics for your Pomodoro sessions';

  async run() {
    await showAnalytics();
  }
}
