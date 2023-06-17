# process statistics

To aggregate statistics of a given time range.

## Pre-requisite

```
1. Node V16
```

## How to run

```
npm i
npm run start
```

## Test

```
npm i
npm run test
```

## Note

There are some commented code in `index.js`, try to uncomment each to run against real API.

## Limitation

Due to region/localisation, local dev might have different timezone to process. To cather this issue, strongly advice to use `Date.UTC` to lock a time in UTC to prevent flaky execution.