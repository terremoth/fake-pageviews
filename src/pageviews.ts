interface PageviewsOptions {
    start_views: number;
    start_date: Date;
    coefficient: number;
}

function pageviews(options: PageviewsOptions): number {
    if (!options || typeof options !== "object") {
        throw new TypeError("pageviews(): options must be an object.");
    }

    const {start_views, start_date, coefficient } = options;

    if (!Number.isInteger(start_views) || start_views <= 0) {
        throw new TypeError("pageviews(): start_views must be an integer greater than zero.");
    }

    if (!(start_date instanceof Date) || Number.isNaN(start_date.getTime())) {
        throw new TypeError("pageviews(): start_date must be a valid Date object.");
    }

    const now = new Date();

    if (start_date.getTime() > now.getTime()) {
        throw new RangeError("pageviews(): start_date cannot be in the future.");
    }

    if (!Number.isFinite(coefficient) || coefficient <= 0) {
        throw new TypeError("pageviews(): coefficient must be a number greater than zero.");
    }

    // Only complete 24-hour periods count as elapsed days.
    const elapsedMs = now.getTime() - start_date.getTime();
    const elapsedDays = Math.floor(elapsedMs / 86_400_000);

    /*
     * Growth model:
     *
     *   views = start_views + coefficient * days^1.1
     *
     * 1.1 is deliberately close to linear:
     * - deterministic
     * - never random
     * - faster than a purely linear model
     * - far slower than quadratic/exponential/factorial growth
     *
     * The exponent is fixed so coefficient remains easy to reason about.
     */
    const views = Math.floor(
        start_views + coefficient * Math.pow(elapsedDays, 1.1)
    );

    return views;
}

// Expose the function explicitly on window without modules/imports.
(window as Window & typeof globalThis).pageviews = pageviews;
