// giphy api key: Y75WfIotx9JgSHqshr47EdGr9OqiuDFh
// buttons array
var buttons = ["Iceland", "India", "Ireland", "Indonesia", "Brazil", "China", "England", "Scotland", "Kenya", "Egypt", "Japan", "Belize"]

// gif get requests
$(document).ready(function () {
  function displayCountryInfo() {
    var country = $(this).attr("data-country");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      country + "-travel&api_key=Y75WfIotx9JgSHqshr47EdGr9OqiuDFh&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var gifsDiv = $("<div class='gifs'>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          gifsDiv.append(p);
          var countryImage = $("<img>");
          countryImage.attr("src", results[i].images.fixed_height.url);
          gifsDiv.append(countryImage);
          $("#gifs").prepend(gifsDiv);
        }
      };
    });
  };

  // Function for displaying buttons
  function renderButtons() {
    $("#button").empty();
    for (var i = 0; i < buttons.length; i++) {
      var a = $("<button>");
      a.addClass("country-btn");
      a.attr("data-country", buttons[i]);
      a.text(buttons[i]);
      $("#button").append(a);
    };
  };

  // adding new button through form
  $("#submit-button").on("click", function (event) {
    event.preventDefault();
    var newCountry = $("#input").val().trim();
    buttons.push(newCountry);
    renderButtons();
  });

  $(document).on("click", ".country-btn", displayCountryInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

});