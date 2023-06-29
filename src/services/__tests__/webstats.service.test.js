jest.mock('../../repositories/webstats.repo');
const mockWebstatsRepo = require('../../repositories/webstats.repo');
const webstatsService = require('../webstats.service');

describe('webstatsService', function() {
    describe('fetchAllWebStats', function() {
        beforeEach(async () => {
            mockWebstatsRepo.fetchWebstats.mockResolvedValueOnce([]);

            await webstatsService.fetchAllWebStats();
        });

        it('should call webstatsRepo.fetchWebstats', async () => {
            expect(mockWebstatsRepo.fetchWebstats).toHaveBeenCalled();
        });
    });
});
