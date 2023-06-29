# process statistics

To aggregate statistics of a given time range.

## Code structure

```
.
├── src
│   ├── controllers     # routing layer
│   ├── repositories    # data access layer
│   └── services        # business logic layer
└── tests               # tests
    └── fixtures        # mock data
```

## Pre-requisite

```
1. Node V16
```

## How to run

```
npm i
npm run start
```

### Note

There are some commented code in `src/index.js`, try to uncomment each to run against real API.

## Test

```
npm i
npm run test
```

## Limitation

Due to region/localisation, local dev might have different timezone to process. To cather this issue, strongly advice to use `Date.UTC` to lock a time in UTC to prevent flaky execution.

## Executed results

```
await processStatistics()
```

![process all webstats](/screenshots/process-all-webstats.png?raw=true "Process All Webstats")

---

```
await processStatistics(new Date(Date.UTC(2019, 3, 5)), new Date(Date.UTC(2019, 3, 12)))
```

![process start end date range webstats](/screenshots/process-start-end-date-range-webstats.png?raw=true "Process All Webstats")

---

```
await processStatistics(new Date(Date.UTC(2019, 3, 14)));
```

![process start date range webstats](/screenshots/process-start-date-range-webstats.png?raw=true "Process All Webstats")