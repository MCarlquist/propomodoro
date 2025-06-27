export type Intensity = 'low' | 'medium' | 'high';
export interface SessionRecord {
    id?: number;
    task: string;
    intensity: Intensity;
    completed: boolean;
    durationMS: number;
    created_at?: string;
}