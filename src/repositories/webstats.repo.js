const fetch = require('node-fetch');
const API_URL =
    'https://bitbucket.org/!api/2.0/snippets/tawkto/aA8zqE/4f62624a75da6d1b8dd7f70e53af8d36a1603910/files/webstats.json';

async function fetchWebstats() {
    const response = await fetch(API_URL);
    return response.json();
}

module.exports = {
    fetchWebstats
}
