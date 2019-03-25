var sport = [];
function createButton() {
  $("#new-button").empty();
  for (var i = 0; i < sport.length; i++) {
    var newButton = $("<button>").addClass("data-sport", sport);
    newButton.attr("data-sport", sport[i]);
    newButton.text(sport[i]);
    $("#new-button").append(newButton);
    console.log(sport);
  }
}
createButton();

$("#add-sport").on("click", function(event) {
  event.preventDefault();
  var newSport = $("#sport-input").val();
  sport.push(newSport);
  $("#sport-input").val("");
  console.log(newSport);
  createButton();
});

$("button").on("click", function() {
  $("#gifs-appear").empty();
  var sport = $(this).attr("data-sport");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    sport +
    "&api_key=QJzkzP7TOujkdpBAaxmamMxDHQ6hTrfB&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data comes back from the API

    .then(function(response) {
      var results = response.data;
      console.log(results);

      // Looping over every result item
      for (var i = 0; i < results.length; i++) {
        var sportDiv = $("<div>");
        var sportImage = $("<img>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        sportImage.attr("src", results[i].images.fixed_height.url);
        sportDiv.append(p);
        sportDiv.append(sportImage);

        $("#gifs-appear").prepend(sportDiv);
      }
    });
});
