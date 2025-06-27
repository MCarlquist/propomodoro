import notifier from 'node-notifier';

export function notifySessionComplete(task: string): void {
    notifier.notify({
        title: 'Pomodoro Timer',
        message: `Session complete for task: "${task}. Time for a break."`,
        sound: true,
        wait: false
    });
};