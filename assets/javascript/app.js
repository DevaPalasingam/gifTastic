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

		//Click gif: this function will toggle between still or animated gif when you click on the gif
		$ (document).on("click", ".gif", function() {
			console.log("clicked something");
			if ($(this).hasClass("gif")) {

				var state = $(this).attr("data-state");

				//if the gif is still, animate it
				if (state === "still") {
					$(this).attr("src", $(this).attr("data-animate"));
					$(this).attr("data-state", "animate");
					console.log("animating gif");
				}
				//if the gif is animated, still it
				else {
					$(this).attr("src", $(this).attr("data-still"));
					$(this).attr("data-state", "still");
					console.log("stilling gif");
				}

			}
		});
		//Click gif:===========================================

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
		var buttonClicked = $ (this).attr("data-name");

		makeGif(buttonClicked);

	});
	//Click Button:============================================
}
//makeButtons:==================================================


//makeGif:
function makeGif(gifButton) {
	console.log("button pressed: " + gifButton);

	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?api_key=zMbakXvDgLzdHgGLD8ljNumQmXZ2ThJU&q=" + gifButton + "&limit=10&offset=0&rating=PG&lang=en",
		method: "GET"
	})
	.done(function(gifInfo) {
		
		
		//gifLoop: this loop grabs gif info from giphy, makes an img tag with the info, then prints it on the page
		for(var i = 0; i < gifInfo.data.length; i++) {
			
			console.log(gifInfo);
			
			//this code grabs the data from giphy
			var imageRating = gifInfo.data[i].rating;
			console.log("image rating: " + imageRating);
			var stillUrl = gifInfo.data[i].images.fixed_height_still.url;
			console.log("still image url: " + stillUrl);
			var animateUrl = gifInfo.data[i].images.fixed_height.url;
			console.log("animated url: " + animateUrl);
			

			//creating a div tag	
			var divTag = $("<div>");
			divTag.attr("class", "col-xs-4");


			//this code makes an image tag and gives it the data from giphy
			var imageTag = $("<img>");
			imageTag.attr("src", stillUrl);
			imageTag.attr("data-still", stillUrl);
			imageTag.attr("data-animate", animateUrl);
			imageTag.attr("data-state", "still");
			imageTag.attr("class", "gif img-responsive");
			imageTag.attr("rating", imageRating);

			//creating a p tag with the image rating
			var p = $("<p>");
			p.text("Rated " + imageRating.toUpperCase());


			divTag.append(p);
			divTag.append(imageTag);
			$ ("#gifCol").prepend(divTag);

		}
		//gifLoop:==========================================


		// //Click gif: this function will toggle between still or animated gif when you click on the gif
		// $ (".gif").on("click", function() {
		// 	var state = $(this).attr("data-state");

		// 	//if the gif is still, animate it
		// 	if (state === "still") {
		// 		$(this).attr("src", $(this).attr("data-animate"));
		// 		$(this).attr("data-state", "animate");
		// 		console.log("animating gif");
		// 	}
		// 	//if the gif is animated, still it
		// 	else {
		// 		$(this).attr("src", $(this).attr("data-still"));
		// 		$(this).attr("data-state", "still");
		// 		console.log("stilling gif");
		// 	}
		// });
		// //Click gif:===========================================
	});
}
//makeGif:======================================================


//Functions: ===================================================
