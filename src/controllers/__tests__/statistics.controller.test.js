jest.mock('../../services/webstats.service');
jest.mock('../../services/statistics.service');
const mockWebstatsService = require('../../services/webstats.service');
const mockStatisticsService = require('../../services/statistics.service');
const statisticsController = require('../statistics.controller');

describe('statisticsController', function () {
    let realDate;

    beforeAll(() => {
        // Save the current implementation of Date so you can restore it later
        realDate = Date;
    });

    beforeEach(() => {
        // Mock the system date and time
        const mockedDate = new Date('2022-01-01T12:00:00Z');
        global.Date = jest.fn(() => mockedDate);
        global.Date.now = realDate.now;
    });

    afterAll(() => {
        // Restore the original implementation of Date
        global.Date = realDate;
    });

    describe('processStatistics', function () {
        beforeEach(function () {
            mockWebstatsService.fetchAllWebStats.mockResolvedValueOnce([]);
            mockStatisticsService.aggregateStatistics.mockResolvedValueOnce({});
        });

        describe('without startDate and endDate', () => {
            it('should call statisticsService.aggregateStatistics', async () => {
                await statisticsController.processStatistics();

                expect(
                    mockStatisticsService.aggregateStatistics
                ).toHaveBeenCalledWith({
                    rawWebStats: [],
                    startDate: new Date(1900, 0, 1),
                    endDate: new Date(),
                });
            });
        });

        describe('with startDate and endDate', function () {
            it('should call statisticsService.aggregateStatistics', async () => {
                await statisticsController.processStatistics(
                    realDate.UTC(2019, 3, 2),
                    realDate.UTC(2019, 3, 5)
                );

                expect(
                    mockStatisticsService.aggregateStatistics
                ).toHaveBeenCalledWith({
                    rawWebStats: [],
                    startDate: realDate.UTC(2019, 3, 2),
                    endDate: realDate.UTC(2019, 3, 5),
                });
            });
        });

        describe('with startDate only', function () {
            it('should call statisticsService.aggregateStatistics', async () => {
                await statisticsController.processStatistics(
                    realDate.UTC(2019, 3, 2)
                );

                expect(
                    mockStatisticsService.aggregateStatistics
                ).toHaveBeenCalledWith({
                    rawWebStats: [],
                    startDate: realDate.UTC(2019, 3, 2),
                    endDate: new Date(),
                });
            });
        });
    });
});
