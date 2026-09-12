# Fake Pageviews

TypeScript Plugin without modules to show a determinist pageviews counter.

## Usage

```html
<script src="/js/pageviews.min.js"></script>

<span id="views"></span>

<script>
pageviews({
    start_views: 1500,
    start_date: new Date('2002-03-25 03:01:40'),
    coefficient: 100
});
</script>
```


## Formula

```text
views = start_views + coefficient × days^1.1
```

`days` is the 24 period quantity (in days) since `start_date`.

To calculate how much time it takes to achieve a target:

```text
days = ((target_views - start_views) / coefficient)^(1 / 1.1)
```  

Example:

```text
start_views = 1.000
coefficient = 100
target = 10.000.000

days ≈ ((10.000.000 - 1.000) / 100)^(1 / 1.1)
     ≈ 31,855 days
     ≈ 87.3 years
```

## Validations

- `start_views` must be an integer > 0.
- `start_date` must be a valid `Date`.
- `start_date` not be in future.
- `coefficient` be finite and > 0.

## Build

```bash
npm install
npm run build
```

The process generates:

```text
build/pageviews.js
build/pageviews.d.ts
dist/pageviews.min.js
```

There is no `import` or `export`, bundler or modules systems in runtime. The  file `dist/pageviews.min.js`is a common browser script available:

```js
window.pageviews
```
