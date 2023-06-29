const { processStatistics } = require('../src/controllers/statistics.controller');
const webstatsFixture = require('./fixtures/webstats');

const mockNodeFetch = jest.fn();
jest.mock('node-fetch', () => () => mockNodeFetch());

describe('processStatistics', function() {
    beforeEach(() => {
        mockNodeFetch.mockImplementationOnce(() => ({
            json: () => webstatsFixture
        }))
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    describe('without params', function() {
        it('should process all stats', async () => {
            const res = await processStatistics();

            expect(res).toEqual([
                {
                    websiteId: 'web-1',
                    chats: 6,
                    missedChats: 8
                },
                {
                    websiteId: 'web-2',
                    chats: 5,
                    missedChats: 13
                },
            ]);
        });
    });

    describe('with fromDate only', function() {
        it('should retrieve stats since the given date', async () => {
            const res = await processStatistics(new Date(Date.UTC(2019, 3, 2)));

            expect(res).toEqual([
                {
                    websiteId: 'web-1',
                    chats: 2,
                    missedChats: 3
                },
                {
                    websiteId: 'web-2',
                    chats: 3,
                    missedChats: 13
                }
            ]);
        });
    });

    describe('with fromDate and endDate', function() {
        it('should retrieve stats within the given date', async () => {
            const res = await processStatistics(new Date(Date.UTC(2019, 3, 2)), new Date(Date.UTC(2019, 3, 3)));

            expect(res).toEqual([
                {
                    websiteId: 'web-1',
                    chats: 2,
                    missedChats: 3
                },
                {
                    websiteId: 'web-2',
                    chats: 1,
                    missedChats: 6
                },
            ]);
        });
    });
});
