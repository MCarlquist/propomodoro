/**
 * Pomodoro session intensity levels.
 */
export type Intensity = 'low' | 'medium' | 'high';

/**
 * Represents a record of a Pomodoro session.
 */
export interface SessionRecord {
    /** Unique session ID (optional, assigned by database) */
    id?: number;
    /** Description of the focus task */
    task: string;
    /** Intensity level of the session */
    intensity: Intensity;
    /** Whether the session was completed */
    completed: boolean;
    /** Duration of the session in milliseconds */
    durationMS: number;
    /** Timestamp when the session was created (optional, assigned by database) */
    created_at?: string;
}