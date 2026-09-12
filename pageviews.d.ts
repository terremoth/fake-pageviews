interface PageviewsOptions {
    start_views: number;
    start_date: Date;
    coefficient: number;
}

declare function pageviews(options: PageviewsOptions): number;
