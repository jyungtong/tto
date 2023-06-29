const { processStatistics } = require('./controllers/statistics.controller');

(async () => {
    const res = await processStatistics();
    // const res = await processStatistics(new Date(Date.UTC(2019, 3, 5)), new Date(Date.UTC(2019, 3, 12)))
    // const res = await processStatistics(new Date(Date.UTC(2019, 3, 14)));

    console.log(res);
})();
