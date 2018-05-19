// Rrquire dotenv package
require('dotenv').config();

// Environment variable for Twitter
var twitter = require('twitter');

// Import keys.js file
var keys = require("./keys.js");

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
};
// ---------------------------Function for my-tweets---------------------
// check for user's command
// to write the function, will have to insert everyting within the curly braces into the funciton
function tweets() {
  var client = new twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
  // Grab user input/ command
  var username = process.argv[3];
  if (!username) {
    username = "Mooncakecamp";
  }
  params = { screen_name: username };
  client.get("statuses/user_timeline", params, function (error, data, response) {
    if (!error) {
      // for loop to display tweets
      for (var i = 0; i < data.length; i++) {
        var tweets =
          "@" + data[i].user.screen_name + ": " +
          data[i].text + "\n" +
          data[i].created_at + "\n" +
          console.log(tweets);
      }
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
  // Environment variable for Spotify
  params = songName;
  var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET,
  });
  
  // grab user input
  spotify.search({ type: 'track', query: params }, function (err, data) {
    if (!err) {
      var songInfo = data.tracks.items;
      for (var i = 0; i < 5; i++) {
        if (songInfo[i] != undefined) {

          // Print spotify results
          var spotifyResults =
            "Artist: " + songInfo[i].artists[0].name +
            "\nSong: " + songInfo[i].name +
            "\nAlbum Name: " + songInfo[i].album.name
        };
        console.log(spotifyResults);

        // Handling error
        if (err) {
          console.log("Error");
          return;
        }
      };
    }
  });
};
//  ----------------- Function for OMDB --------------------
// function for OMDB call "movie"
// Include the request npm package
function movie() {
  var movieName = process.argv[3];

  // If no movie title provided default to Mr. Nobody
  if (!movieName) {
    movieName = "Mr. Nobody"
  }
  // Request to the OMDB API 
  param = movieName;

  request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

      // parse the movie object from API call
      var movieObject = JSON.parse(body);

      // Print results
      var movieInfo =
        "Title: " + movieObject.Title +
        "\nYear: " + movieObject.Year +
        "\nIMDB Rating: " + movieObject.imdbRating +
        "\nRotten Tomatoes Rating: " + movieObject.tomatoRating +
        "\nProduced by (Country): " + movieObject.Country +
        "\nLanguage: " + movieObject.Language +
        "\nPlot: " + movieObject.Plot +
        "\nActors: " + movieObject.Actors
      console.log(movieInfo);
    }
    else {
      console.log("Error");
    }
  });
};

// Random Function
function random() {
  fs.readFile("./random.txt", "utf8", function (error, data) {
    if (!error) {
      doWhatItSaysResults = data.split(",");
      song(doWhatItSaysResults[0], doWhatItSaysResults[1]);
    }
    else {
      console.log("Error");
    }
  });
};
