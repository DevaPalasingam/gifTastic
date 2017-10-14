var authKey = "zMbakXvDgLzdHgGLD8ljNumQmXZ2ThJU";
var currentArray = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

//Document ready: waits for the html to load before running stuff
$ (document).ready(function() {

makeButtons();

//Enter key: This code will run when user pushes the enter key
$(document).keypress(function(e) {
    if(e.which == 13) {
        console.log("You pressed enter!");

        //Record: records the input then clears the search bar
        var searchInput = $ ("#textInput").val().trim();

        //if the user didn't type anything, does nothing
        if (searchInput === "") {
        	return;
        }

        console.log(searchInput);
        $ ("#textInput").val("");
        //Record:============================================


        //Add input: adds user input to currentArray
        currentArray.push(searchInput);
        console.log(currentArray);

        //calls makeButtons to remake the buttons
        makeButtons();

    }
});
//Enter key:================================================

//Click Button:
$ (document).on("click", function() {

	console.log(this);

	var whichButton = $ (this).attr("data-name");
	console.log("button clicked");
	console.log($ (this).attr("data-name"));
	makeGif(whichButton);

});
//Click Button:============================================

});
//Document ready===========================================


//Functions: Here's a place for functions

//makeButtons:
function makeButtons() {
	$ ("#buttonsHere").empty();

	for (var i = 0; i < currentArray.length; i++) {
		var a = $("<button>");
		a.addClass("animal");
		a.attr("data-name", currentArray[i]);
		a.text(currentArray[i]);
		$ ("#buttonsHere").append(a);
	}
}
//makeButtons:==================================================


//makeGif:
function makeGif(gifButton) {
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?api_key=zMbakXvDgLzdHgGLD8ljNumQmXZ2ThJU&q=" +gifButton + "&limit=10&offset=0&rating=PG&lang=en",
		method: "GET"
	})
	.done(function(gifInfo) {
		var imageRating = gifInfo.data[0].rating;
		console.log(imageRating);
	});
}
//makeGif:======================================================


//Functions: ===================================================
