const webstatsService = require('../services/webstats.service');
const statisticsService = require('../services/statistics.service');

async function processStatistics(startDate, endDate) {
    const startDateOrDefault = startDate ? startDate : new Date(1900, 0, 1);
    const endDateOrDefault = endDate ? endDate : new Date();

    const allWebStats = await webstatsService.fetchAllWebStats();

    const aggregatedData = statisticsService.aggregateStatistics({
        rawWebStats: allWebStats,
        startDate: startDateOrDefault,
        endDate: endDateOrDefault
    });

    return Object.values(aggregatedData);
}

module.exports = {
    processStatistics,
};
