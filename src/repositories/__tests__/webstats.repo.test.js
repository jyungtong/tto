const webstatsRepo = require('../webstats.repo');

const mockNodeFetch = jest.fn();
const mockJson = jest.fn();
jest.mock('node-fetch', () => (url) => mockNodeFetch(url));

describe('webstats.repo', function() {
    beforeEach(async () => {
        mockJson.mockResolvedValueOnce([]);
        mockNodeFetch.mockImplementationOnce(() => ({
            json: mockJson
        }));

        await webstatsRepo.fetchWebstats();
    });

    describe('fetchWebstats', function() {
        it('should call API URL', function() {
            expect(mockNodeFetch).toBeCalledWith('https://bitbucket.org/!api/2.0/snippets/tawkto/aA8zqE/4f62624a75da6d1b8dd7f70e53af8d36a1603910/files/webstats.json');
        });

        it('should call json', function() {
            expect(mockJson).toHaveBeenCalled();
        });
    });
});
