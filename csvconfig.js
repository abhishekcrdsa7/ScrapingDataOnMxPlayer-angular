const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: './movies.csv',
    header: [
        {id: 'title', title: 'TITLE'},
        {id: 'type', title: 'TYPE'},
        {id: 'releaseDate', title: 'RELEASE'},
        {id: 'webUrl', title: 'WEBURL'}
    ]
});

module.exports = csvWriter;
