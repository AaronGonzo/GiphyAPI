var sport = [];
function createButton() {
  $("#new-button").empty();
  for (var i = 0; i < sport.length; i++) {
    var newButton = $("<button>");
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

var handler = function() {
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
        var attributes = {
          src: results[i].images.fixed_height_still.url,
          "data-still": results[i].images.fixed_height_still.url,
          "data-animate": results[i].images.fixed_height.url
        };
        sportImage.attr(attributes);
        sportDiv.append(p);
        sportDiv.append(sportImage);
        sportImage.addClass("gif");

        $("#gifs-appear").prepend(sportDiv);
      }
      $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
};
$("#new-button").on("click", "button", handler);

$("button").on("click", handler);
