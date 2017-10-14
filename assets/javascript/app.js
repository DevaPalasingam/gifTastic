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

	//Click Button:
	$ (".animal").on("click", function() {

		console.log(this);

		makeGif(this);

	});
	//Click Button:============================================
}
//makeButtons:==================================================


//makeGif:
function makeGif(gifButton) {
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?api_key=zMbakXvDgLzdHgGLD8ljNumQmXZ2ThJU&q=" +gifButton + "&limit=10&offset=0&rating=PG&lang=en",
		method: "GET"
	})
	.done(function(gifInfo) {
		
		for(var i = 0; i < gifInfo.data.length; i++) {
			var imageRating = gifInfo.data[i].rating;
			console.log("image rating: " + imageRating);
			var stillUrl = gifInfo.data[i].images.fixed_height_small_still.url;
			console.log("still image url: " + stillUrl);
			var animateUrl = gifInfo.data[i].images.fixed_height_small.url;
			console.log("animated url: " + animateUrl);
		}


	});
}
//makeGif:======================================================


//Functions: ===================================================
