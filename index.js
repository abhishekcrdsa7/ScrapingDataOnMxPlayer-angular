const r = require('request');
const rp = require('request-promise');

const { addToMoviesArray, modifyShowsArray, addItemsToShowsArray, createCsvFileWithMovies } = require('./utilFunctions');

//array of all the shows on the website whether movie, tv show, web series
let shows = [];

//array of only movies on the website
let movies = [];

//condition if crawl is true then continue to crawl the website
let crawl = true;

//url of the api which gives the list of all shows
let urlMovies = 'https://api.mxplay.com/v1/web/home/tab/08f8fce450d1ecf00efa820f611cf57b';
let urlTV = 'https://api.mxplay.com/v1/web/home/tab/feacc8bb9a44e3c86e2236381f6baaf3';
let urlWeb = 'https://api.mxplay.com/v1/web/home/tab/7694f56f59238654b3a6303885f9166f';
let urlMusic = 'https://api.mxplay.com/v1/web/home/tab/72d9820f7da319cbb789a0f8e4b84e7e';

let urlArray = [urlMovies, urlTV, urlWeb, urlMusic];

//function to crawl the website
async function crawlWebsite() {
  for(let u of urlArray) {
    crawl = true;

    //options to be passed when requesting the content from the api
    let options = {
      uri: u,
      json: true
    }
    while(crawl){
      //make request to the website
        const p = await rp(options);

      //array of sections in the response
        const arr = p.sections;

      //need to continue until we have not stored all the shows in the shows array
        crawl = p.next !== null;
        if(!crawl) {
          break;
        }

      //create a new options object as the shows on current url has been stored
        const temp = u+'?'+p.next;
        options = {...options, uri: temp};

      //add the shows to the show array
        shows = addItemsToShowsArray(arr, shows);
    }

    //modify the shows array to delete the unwanted keys in the objects
    shows = modifyShowsArray(shows);
  }

  //add movies to movies array
  movies = addToMoviesArray(shows, movies);

  //function to create a movies csv file
  //to be invoked only after crawlWebsite function has completed the execution
  createCsvFileWithMovies(movies);
}

crawlWebsite();
