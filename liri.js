 var fs = require('fs');
 var Twitter = require('twitter');
 var spotify = require('spotify');
 var omdb = require('omdb');
 var request = require('request');
 var input1 = process.argv[2];
 var input2 = process.argv.splice(3).join(" ");



 function log() {

     fs.appendFile('./log.txt', input1 + " " + input2 + ", ", function(err) {

         // If an error was experienced we say it.
         if (err) {
             console.log(err);
         }

         // If no error is experienced, we'll log the phrase "Content Added" to our node console.
         else {
             // console.log("Content Added!");
         }

     });
 };

 var keys = require('./keys.js');
 // console.log(keys.twitterKeys);

 var client = new Twitter(keys.twitterKeys);

 var params = {
     screen_name: 'jaredneutel',
     count: 20
 };

 run();

 function run() {

     if (input1 === "my-tweets") {

         client.get('statuses/user_timeline', params, function(error, tweets, response) {
             if (!error) {
                 console.log('');
                 console.log('My Last 20 Tweets: ');
                 console.log('--------------------------');
                 tweets.forEach(function(individualTweet) {
                     console.log('Time Posted: ' + individualTweet.created_at);
                     console.log('Tweet: ' + individualTweet.text);
                     console.log('--------------------------');


                 });

             } else {
                 console.log(error);
             };
         });

         log();

     } else if (input1 === "spotify-this-song") {

         spotify.search({ type: 'track', query: input2 }, function(err, data) {
             if (err) {
                 console.log('Error occurred: ' + err);
                 return;
             }
             console.log('');
             console.log('Spotify Song Information Results: ');
             console.log('--------------------------');
             console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
             console.log("Track Title: " + data.tracks.items[0].name);
             console.log("Link to Song: " + data.tracks.items[0].preview_url);
             console.log("Album Title: " + data.tracks.items[0].album.name);
             console.log('--------------------------');
         });

         log();

     } else if (input1 === "movie-this") {

         // Then run a request to the OMDB API with the movie specified
         request("http://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&r=json&tomatoes=true", function(error, response, body) {

             // If the request is successful (i.e. if the response status code is 200)
             if (!error && response.statusCode === 200) {

                 // Parse the body of the site and recover just the imdbRating
                 // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                 // console.log(JSON.parse(body));
                 console.log('');
                 console.log('OMDB Movie Information: ');
                 console.log('--------------------------');
                 console.log("Movie Title: " + JSON.parse(body).Title);
                 console.log("Year of Release: " + JSON.parse(body).Year);
                 console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                 console.log("Countries produced in: " + JSON.parse(body).Country);
                 console.log("Language: " + JSON.parse(body).Language);
                 console.log("Movie Plot: " + JSON.parse(body).Plot);
                 console.log("Actor(s): " + JSON.parse(body).Actors);
                 console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                 console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
                 console.log('--------------------------');
             } else {

                 console.log(error);
                 // ask about how to run it for Mr. Nobody

             }


         });

         log();


     } else if (input1 === "do-what-it-says") {

          log();

         fs.readFile('random.txt', 'utf8', function(err, data) {
             if (err) throw err;
             // console.log(data);

             var arr = data.split(',');

             input1 = arr[0].trim();
             input2 = arr[1].trim();
             run();
             // Ask how to use the my-tweets funtion
         });



     }
 };
