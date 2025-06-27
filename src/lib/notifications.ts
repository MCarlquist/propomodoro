import notifier from 'node-notifier';

/**
 * Sends a desktop notification when a Pomodoro session is complete.
 *
 * @param {string} task - The name or description of the completed task.
 * @returns {void}
 */
export function notifySessionComplete(task: string): void {
    notifier.notify({
        title: 'Pomodoro Timer',
        message: `Session complete for task: "${task}. Time for a break."`,
        sound: true,
        wait: false
    });
}