function aggregateStatistics({ rawWebStats, startDate, endDate }) {
    // Object to store the aggregated results
    const aggregatedData = {};

    // Iterate over each object in the array
    for (const webStat of rawWebStats) {
        const websiteId = webStat.websiteId;
        const webStatDate = new Date(webStat.date);

        const isWebStatDateOutOfStartDateRange = webStatDate < startDate;
        const isWebStatDateOutOfEndDateRange = webStatDate > endDate;
        const shouldSkip =
            isWebStatDateOutOfStartDateRange || isWebStatDateOutOfEndDateRange;

        if (shouldSkip) {
            continue;
        }

        // Check if the websiteId is already present in the aggregatedData object
        if (aggregatedData.hasOwnProperty(websiteId)) {
            // If present, add the chats and missedChats values
            aggregatedData[websiteId].chats += webStat.chats;
            aggregatedData[websiteId].missedChats += webStat.missedChats;
        } else {
            // If not present, create a new entry with chats and missedChats values
            aggregatedData[websiteId] = {
                websiteId: websiteId,
                chats: webStat.chats,
                missedChats: webStat.missedChats,
            };
        }
    }

    return aggregatedData;
}

module.exports = {
    aggregateStatistics,
};
