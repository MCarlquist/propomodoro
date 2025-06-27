import { resolve } from 'path';
import TerminalKit from 'terminal-kit';
import inquirer from 'inquirer';

export type Intensity = 'low' | 'medium' | 'high';

const term = TerminalKit.terminal;


export async function promptIntensity(): Promise<Intensity> {
    return new Promise((resolve) => {
        term.singleColumnMenu(['low (20min)', 'medium (40min)', 'high (1h15min)'], (error, response) => {
            if (error) {
                term.red('Error selecting intensity: ' + error.message + '\n');
                process.exit(1);
            }
            const selectedIntensity = response.selectedText as Intensity;
            term('\n');
            resolve(selectedIntensity);
        });
    });
}

export async function promptTask(): Promise<string> {
    return new Promise((resolve) => {
        term('Enter your focus task: ');
        term.inputField({ history: [], autoComplete: [], autoCompleteMenu: true }, (error: any, input: string | undefined) => {
            if (error) {
                term.red('Error reading task input: ' + error.message + '\n');
                process.exit(1);
            }
            if (typeof input !== 'string') {
                term.red('No input provided.\n');
                process.exit(1);
            }

            if (input.trim().length > 120) {
                term.red('Task description is too long. Please keep it under 120 characters.\n');
                resolve(promptTask());
            } else {
                resolve(input.trim());
            }
        });
    });
};

export async function promptConfirm(intensity: Intensity, task: string): Promise<boolean> {
    term("\n");

    const confirmPrompt = [
        {
            type: 'confirm',
            name: 'confirmStart',
            message: `Start a ${intensity} intensity session for task:\n"${task}"?`,
            default: false,
        }
    ];

    const { confirmStart } = await inquirer.prompt<{ confirmStart: boolean }>(confirmPrompt as any);
    return confirmStart;
}