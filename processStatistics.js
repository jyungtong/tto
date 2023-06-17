const fetch = require('node-fetch');
const API_URL = 'https://bitbucket.org/!api/2.0/snippets/tawkto/aA8zqE/4f62624a75da6d1b8dd7f70e53af8d36a1603910/files/webstats.json';

async function processStatistics(startDate, endDate) {
    const response = await fetch(API_URL);
    const data = await response.json();

    const startDateTimestamp = startDate ? startDate.getTime() : new Date(1900, 0, 1);
    const endDateTimestamp = endDate ? endDate.getTime() : new Date();

    const aggStats = data.reduce((accStats, currData) => {
        const dataTimestamp = new Date(currData.date).getTime();

        if (startDateTimestamp <= dataTimestamp && dataTimestamp <= endDateTimestamp) {
            if (!accStats[currData.websiteId]) {
                return {
                    ...accStats,
                    [currData.websiteId]: {
                        chats: currData.chats,
                        missedChats: currData.missedChats
                    }
                }
            }

            accStats[currData.websiteId] = {
                chats: ((accStats[currData.websiteId] || {}).chats || 0) + currData.chats,
                missedChats: ((accStats[currData.websiteId] || {}).missedChats || 0) + currData.missedChats,
            }

            return accStats;
        }

        return accStats;
    }, {});

    const transformedFinalResults = Object.keys(aggStats).map(key => {
        return {
            websiteId: key,
            chats: aggStats[key].chats,
            missedChats: aggStats[key].missedChats
        }
    });
    
    return transformedFinalResults;
}

module.exports = {
    processStatistics
}
