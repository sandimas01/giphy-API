// Example queryURL for Giphy API
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=5CvSI2HEOWxH4hmFgqM95HNWa6Q89PpH";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
});