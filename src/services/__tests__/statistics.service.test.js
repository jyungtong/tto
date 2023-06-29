const statisticsService = require('../statistics.service');
const webstatsFixture = require('../../../tests/fixtures/webstats');

describe('statisticsService', function () {
    describe('aggregateStatistics', function () {
        describe('without startDate and endDate', function () {
            it('should process all stats', async () => {
                const res = statisticsService.aggregateStatistics({
                    rawWebStats: webstatsFixture,
                });

                expect(res).toEqual({
                    'web-1': {
                        websiteId: 'web-1',
                        chats: 6,
                        missedChats: 8,
                    },
                    'web-2': {
                        websiteId: 'web-2',
                        chats: 5,
                        missedChats: 13,
                    },
                });
            });
        });

        describe('with startDate and endDate', function () {
            it('should stats in the date range', async () => {
                const res = statisticsService.aggregateStatistics({
                    rawWebStats: webstatsFixture,
                    startDate: new Date(Date.UTC(2019, 3, 2)),
                    endDate: new Date(Date.UTC(2019, 3, 3)),
                });

                expect(res).toEqual({
                    'web-1': {
                        websiteId: 'web-1',
                        chats: 2,
                        missedChats: 3,
                    },
                    'web-2': {
                        websiteId: 'web-2',
                        chats: 1,
                        missedChats: 6,
                    },
                });
            });
        });

        describe('with startDate only', function () {
            it('should stats in the date range', async () => {
                const res = statisticsService.aggregateStatistics({
                    rawWebStats: webstatsFixture,
                    startDate: new Date(Date.UTC(2019, 3, 2)),
                });

                expect(res).toEqual({
                    'web-1': {
                        websiteId: 'web-1',
                        chats: 2,
                        missedChats: 3,
                    },
                    'web-2': {
                        websiteId: 'web-2',
                        chats: 3,
                        missedChats: 13,
                    }
                });
            });
        });

        describe('with endDate only', function () {
            it('should stats in the date range', async () => {
                const res = statisticsService.aggregateStatistics({
                    rawWebStats: webstatsFixture,
                    endDate: new Date(Date.UTC(2019, 3, 2)),
                });

                expect(res).toEqual({
                    'web-1': {
                        websiteId: 'web-1',
                        chats: 6,
                        missedChats: 8,
                    },
                    'web-2': {
                        websiteId: 'web-2',
                        chats: 2,
                        missedChats: 0,
                    }
                });
            });
        });
    });
});
