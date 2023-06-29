const webstatsRepo = require('../repositories/webstats.repo');

function fetchAllWebStats() {
    return webstatsRepo.fetchWebstats();
}

module.exports = {
    fetchAllWebStats
}
