import EventEmitter from "events";

export interface TickData {
    minutes: number;
    seconds: number;
}

export class Timer extends EventEmitter {
    private durationMS: number;
    private startTime: number | null = null;
    private timeoutId: NodeJS.Timeout | null = null;
    private intervalId: NodeJS.Timeout | null = null;

    constructor(durationMS: number) {
        super();
        this.durationMS = durationMS;
    }

    start() {
        this.startTime = Date.now();
        this.intervalId = setTimeout(() => this.emitTick(), 1000);
        this.timeoutId = setTimeout(() => this.complete(), this.durationMS);
    };

    private emitTick() {
        if (!this.startTime) return;
        const elapsed = Date.now() - this.startTime;
        const remaining = Math.max(this.durationMS - elapsed, 0);
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        this.emit("tick", { minutes, seconds });
    }

    private complete() {
        this.clearTimers();
        this.emit("complete");
    }

    getRemaining(): number {
        if (!this.startTime) return this.durationMS;
        const elapsed = Date.now() - this.startTime;
        return Math.max(this.durationMS - elapsed, 0);
    };

    onTick(callback: (tick: TickData) => void) {
        this.on("tick", callback);
    };

    onComplete(callback: () => void) {
        this.on("complete", callback);
    };

    clearTimers() {
        if(this.intervalId) clearInterval(this.intervalId);
        if(this.timeoutId) clearTimeout(this.timeoutId);
    };
}

