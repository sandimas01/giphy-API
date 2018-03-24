      // Initial array of movies
      var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

      // Function for dumping the JSON content for each button into the div
      function displayMovieGifs() {
          
        var movie = $(this).attr("data-name");

// Constructing a queryURL using the movie name
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  movie + "&api_key=5CvSI2HEOWxH4hmFgqM95HNWa6Q89PpH&limit=10";

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
      var movieDiv = $("<div>");
      movieDiv.addClass("movieDiv")

      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);

      // Creating and storing an image tag
      var movieImage = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item
      movieImage.addClass("aniGif");
      movieImage.attr("src", results[i].images.fixed_height_small_still.url);
      movieImage.attr("data-animate", results[i].images.fixed_height_small.url);
      movieImage.attr("data-still", results[i].images.fixed_height_small_still.url);
      movieImage.attr("data-state", "still");

      // $(".aniGif").on("click", function() {
      //   // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      //   var state = $(this).attr("data-state");
      //   console.log(this);
      //   // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      //   // Then, set the image's data-state to animate
      //   // Else set src to the data-still value
      //   if (state == "still") {
      //     $(this).attr("src", $(this).attr("data-animate"));
      //     $(this).attr("data-state", "animate");
      //   } else {
      //     $(this).attr("src", $(this).attr("data-still"));
      //     $(this).attr("data-state", "still");
      //   }
      // });
      
      // Appending the paragraph and image tag to the animalDiv
      movieDiv.append(p);
      movieDiv.append(movieImage);

      // Prependng the movieDiv to the HTML page in the "#gifs-appear-here" div
      $("#images").prepend(movieDiv);


      


    } 
          renderButtons();   

          $(".aniGif").on("click", function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            console.log(this);
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state == "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });   
          
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
      $(document).on("click", ".movie", displayMovieGifs);

      // Calling the renderButtons function to display the initial buttons
      renderButtons();