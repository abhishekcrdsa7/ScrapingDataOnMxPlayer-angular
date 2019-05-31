const _ = require('lodash');

//use the csvWriter to create a csv file with the list of movies
const csvWriter = require('./csvconfig');

const funcs = {
  createCsvFileWithMovies(movies) {
    csvWriter.writeRecords(movies)
      .then(() => {
          console.log('...Done');
      });
  },
  modifyShowsArray(shows) {
    for(let i = 0; i < shows.length;i++){
      shows[i].webUrl = shows[i].webUrl;
      shows[i] = _.pick(shows[i], ['title', 'type', 'releaseDate', 'webUrl', 'image']);
    }
    return shows;
  },
  addToMoviesArray(shows ,movies) {
    for(let i = 0; i < shows.length;i++){
      if(shows[i].type === 'movie') {
        movies.push(shows[i]);
      }
    }
    return movies;
  },
  addItemsToShowsArray(arr, shows){
    for(let i = 0; i < arr.length;i++){
      if(arr[i].items){
        shows = [...shows, ...arr[i].items];
      }
    }
    return shows;
  }
}

module.exports = funcs;
