// Rrquire dotenv package
require("dotenv").config();

// Environment variable for Spotify
var sID = process.env.SPOTIFY_ID;
var sSecret = process.env.SPOTIFY_SECRET;

// Environment variable for Twitter
var Twitter = require('twitter');

// Import keys.js file
var keys = require("./keys.js");

// Import the Twitter NPM package.
var Twitter = require("twitter");

// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");

// Import the request npm package.
var request = require("request");

// Import the FS package for read/write.
var fs = require("fs");

// argument for liri
var liriArgs = process.argv[2];

// The switch-case will direct which function gets run.
switch (liriArgs) {
  case "my-tweets":
    tweets();
    break;

  case "spotify-this-song":
    song();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    random();
    break;
}
// ---------------------------Function for my-tweets---------------------
// check for user's command
// to write the function, will have to insert everyting within the curly braces into the funciton
function tweets() {
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
  // Grab user input/ command
  var args = process.argv.slice(2);
  var params = { screen_name: 'nodejs' };
  twitter.get('search/tweet', { q: 'mooncakecamp' }, function (error, tweets, response) {
    if (!error) {

      // for loop to display tweets
      for (var i = 0; i < tweets.statuses.length; i++);
      console.log(tweets);
    }
    else {
      console.log("Error");
    }
  })
};


// -----------------Function for spotify-this-song ---------------

function song(songName) {
  var songName = process.argv[3];
  
  // if no song name default to The Sign
  if (!songName) {
    songName = "The Sign";
  }

  // grab user input
  params = songName;
  spotify.search({ type: 'track', query: params }, function (err, data) {
    if (!err) {
      var songInfo = data.tracks.items;
      for (var i = 0; i < 5; i++) {
        if (songInfo[i] != undefined) {
          
          // Print spotify results
          var spotifyResults =
            "Artist: " + songInfo[i].artists[0].name +
            "\nSong: " + songInfo[i].name +
            "\nAlbum the song is from: " + songInfo[i].album.name
        };
        console.log(spotifyResults);

        // Handling error
        if (err) {
          console.log('Error occurred: ' + err);
          return;
        }
      };
    }

    //  ----------------- Function for OMDB --------------------
    // function for OMDB call "movie"
    // Include the request npm package
    function movie() {
      var request = require("request");

      // Then run a request to the OMDB API with the movie specified
      request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        }
      });
    }