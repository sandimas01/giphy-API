// Initial array of movies
var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

// Function for dumping the JSON content for each button into the div
function displayMovieInfo() {
  var cat = "cat"
  var movie = $(this).attr("data-name");
  //  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=1";
  var queryURL = "https://api.giphy.com/v1/gifs/random?&api_key=dc6zaTOxFJmzC&limit=1&tag=" + movie + "";
  console.log(queryURL)
  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function(response) {

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    $("#images").text(JSON.stringify(response));
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Saving the image_original_url property
    var imageUrl = response.data.image_original_url;
    console.log(imageUrl);
    // Creating and storing an image tag
    var simpleImage = $("<img>");
    
    // Setting the catImage src attribute to imageUrl
    simpleImage.attr("src", imageUrl);
    simpleImage.attr("alt", "simple image");
    
    // Prepending the catImage to the images div
    $("#images").prepend(simpleImage);
    
    renderButtons();
      

  });

}
// Function for displaying movie data
function renderButtons() {

  // Deleting the buttons prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < movies.length; i++) {

    // Then dynamically generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie to our button
    a.addClass("movie");
    // Adding a data-attribute
    a.attr("data-name", movies[i]);
    // Providing the initial button text
    a.text(movies[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-movie").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var movie = $("#movie-input").val().trim();

  // Adding the movie from the textbox to our array
  movies.push(movie);
  console.log(movies);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Function for displaying the movie info
// Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
$(document).on("click", ".movie", displayMovieInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();



//-----------------------------------------------------------------------

// Adding click event listen listener to all buttons
$("button").on("click", function() {
    // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr("data-animal");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var animalDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var animalImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          animalImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and image tag to the animalDiv
          animalDiv.append(p);
          animalDiv.append(animalImage);

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(animalDiv);
        }
      });
  });