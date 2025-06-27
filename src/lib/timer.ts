import EventEmitter from "events";

/**
 * Data emitted on each timer tick.
 */
export interface TickData {
    minutes: number;
    seconds: number;
}

/**
 * Pomodoro Timer class.
 * Emits 'tick' events every second and a 'complete' event when finished.
 * 
 * Usage:
 *   const timer = new Timer(25 * 60 * 1000);
 *   timer.onTick(({minutes, seconds}) => ...);
 *   timer.onComplete(() => ...);
 *   timer.start();
 */
export class Timer extends EventEmitter {
    private durationMS: number;
    private startTime: number | null = null;
    private timeoutId: NodeJS.Timeout | null = null;
    private intervalId: NodeJS.Timeout | null = null;

    /**
     * @param durationMS Duration of the timer in milliseconds
     */
    constructor(durationMS: number) {
        super();
        this.durationMS = durationMS;
    }

    /**
     * Starts the timer.
     * Emits 'tick' events every second and 'complete' when finished.
     */
    start() {
        this.startTime = Date.now();
        // Start ticking every second
        this.intervalId = setInterval(() => this.emitTick(), 1000);
        // Schedule completion
        this.timeoutId = setTimeout(() => this.complete(), this.durationMS);
    };

    /**
     * Emits a 'tick' event with the remaining time.
     * Called every second.
     * @private
     */
    private emitTick() {
        if (!this.startTime) return;
        const elapsed = Date.now() - this.startTime;
        const remaining = Math.max(this.durationMS - elapsed, 0);
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        this.emit("tick", { minutes, seconds });
    }

    /**
     * Called when the timer completes.
     * Clears all timers and emits 'complete'.
     * @private
     */
    private complete() {
        this.clearTimers();
        this.emit("complete");
    }

    /**
     * Gets the remaining time in milliseconds.
     * @returns {number} Remaining time in ms
     */
    getRemaining(): number {
        if (!this.startTime) return this.durationMS;
        const elapsed = Date.now() - this.startTime;
        return Math.max(this.durationMS - elapsed, 0);
    };

    /**
     * Registers a callback for 'tick' events.
     * @param callback Function called with TickData every second
     */
    onTick(callback: (tick: TickData) => void) {
        this.on("tick", callback);
    };

    /**
     * Registers a callback for the 'complete' event.
     * @param callback Function called when timer completes
     */
    onComplete(callback: () => void) {
        this.on("complete", callback);
    };

    /**
     * Clears all running timers (interval and timeout).
     */
    clearTimers() {
        if(this.intervalId) clearInterval(this.intervalId);
        if(this.timeoutId) clearTimeout(this.timeoutId);
    };
}

