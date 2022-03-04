window.onload = initPage;
// Define and initialize global variables used in the game.
var gameTimer = 31;
var newGame = true;
var pictureOrder = "";
var position1 = null;
var position2 = null;
var resetCounter = 6;

function initPage() {
//	document.getElementById("username").onblur = checkUsername;
//  document.getElementById("password").onblur = checkPassword;
    var startbutton = document.getElementById("start");
    document.getElementById("start").disabled = false;
    startbutton.onclick = checkCell; 
	
	// This code creates the onclick event for the puzzle pieces
    var gameTable = document.getElementById("puzzlegame");
	var cells = gameTable.getElementsByTagName("img");
	for (var i = 0; i < cells.length; i++) {
		var cell = cells[i];
		cell.onclick = checkCell;	
	}
    
	// Starts the scrolling of the other puzzles that are available to play.
	s = setInterval(otherPuzzlesScroll, 100);
				
}

function checkCell(){
	// This is statement checks to see if a non puzzle piece or start button has been clicked.
	// Keeps the user from clicking on something that is not available.
   if(this.alt === "noclick") {
        return;
		
	// This if statement checks to see if it is a new game and if the user clicked the start button.
	// Starts new game an shuffles puzzle pieces.
   } else if(newGame && this.id === "start") {
        newGame = false;
        t = setInterval(timerFunction, 1000);  
        document.getElementById("start").disabled = true;
        startNewGame();      
	// If a user tries to click on a square and hasn't hit the start button
	// then set the position to null 
   } else if(position1 === null && newGame) {
        position1 = null;
        return;
	// If the game isn't new and the user clicks a square the square becomes lighter
	// to indicate that the user clicked a square.
   } else if(position1 === null) {
        position1 = this.parentNode.id;
        document.getElementById(position1).className = "active";
        position2 = null;
	// If the user clicks the same square twice the square goes back to normal and the user has to click 
	// on the button again to initialize the move. You can't move the same piece to the same spot.
    } else if(position1 === this.parentNode.id) {
        document.getElementById(position1).className = "disabled";
        position1 = null;
        position2 = null;
	// If the second square clicked then go and shuffle the two pieces around.
    } else {
        position2 = this.parentNode.id;
        shuffleBoxes(position1, position2);
        document.getElementById(position1).className = "disabled";
        position1 = null;
        position2 = null;
    }    
}

// function that shuffles the pieces.
function shuffleBoxes(position1, position2) {
    // Stores in the cells the new cell location and the mole's cell location.
	var cell1 = document.getElementById(position1);
	var cell2 = document.getElementById(position2);
	
	// Stores in image the image tag of the td element.
	var  cellImage1 = cell1.firstChild;
		
	// Checks to make sure that the element stored in cellImage1
	while(cellImage1.nodeName === "#text"){
		cellImage1 = cellImage1.nextSibling;			
	}
	
	// Stores in image the image tag of the td element.
	var cellImage2 = cell2.firstChild;
	
	// Checks to make sure that the element stored in cellImage2	
	while(cellImage2.nodeName === "#text") {
		cellImage2 = cellImage2.nextSibling;
	}
	
	// Swaps the image elements directly in the DOM.
	cell1.appendChild(cellImage2);
	cell2.appendChild(cellImage1);
    
	// Calls the function to check and see if the pieces are in order.
    picturesInOrder();
}

// This is the count down timer function for the game.
function timerFunction() {
	var countDownTicker;
	var timeLocation = document.getElementById("timebox");
	var timeNumber = document.createElement("h1");
	
	// Checks to see if there is an existing h1 tag in the parent element so that we 
	// can delete it prior to putting a new h1 tag into the parent element.
	if(timeLocation.getElementsByTagName("h1").length > 0) {
		var h1Location = timeLocation.getElementsByTagName("h1")[0];
		timeLocation.removeChild(h1Location);
	}

	// Counts the timer down by 1
    gameTimer = gameTimer - 1;
	
	// Calls the monitor function to see if the game is over
    checkForEndGame();
	
	// Checks to see if the count down timer is less than 10. 
	// If it is then the count down number turns red.
    if(gameTimer > 9) {
		timeLocation.appendChild(timeNumber);
		countdownTicker = document.createTextNode(":" + gameTimer);
		timeNumber.appendChild(countdownTicker);	
	} else {
	    timeLocation.className = "active";
		timeLocation.appendChild(timeNumber);
		countdownTicker = document.createTextNode(":0" + gameTimer);
		timeNumber.appendChild(countdownTicker);			 
	}
}

// Function that checks to see if the pictures are in order.
function picturesInOrder(){
    if(newGame) {
        return;
    } else { 
        var order = document.getElementById("puzzlegame").getElementsByTagName("img");
		// This code takes the image file number located in the file name then stores in a variable.
        for(var i = 0; i < order.length - 5; i++) {
            var orderOfNumbers = order[i].src.substr(-6,2);
            pictureOrder += orderOfNumbers;            
        }
    }   
    
	// Runs monitor function to check for end game.
    checkForEndGame();
        
}

// Monitoring function for the game.
function checkForEndGame(){
	// If the pictures are in order then go to the end game.
   if(pictureOrder === "01020304050607080910111213141516" && gameTimer !== 0) {
        clearInterval(t);
        gameWon = true;
        endGame();
	// If the timer is up before the user completes the puzzle then go to end game.
    } else if(gameTimer === 0 && pictureOrder != "01020304050607080910111213141516") {
        clearInterval(t);
        gameWon = false;
        endGame();
	// If neither the timer or the picture order is correct then return and continue the program.
    } else if(gameTimer !== 0 && pictureOrder != "01020304050607080910111213141516") {
        pictureOrder = "";
        return;
    }
}

// Function that runs for the end game.
function endGame(){
	// If the user won then You Won! will be displayed at the top of the screen.
    if (gameWon) {
        document.getElementById("gamestatus").innerHTML = "<h6 style='font-size: 1em;'>You Won!</h6>"; 
    // If user lost then display Game Over at the top of the screen.	
	} else {
		document.getElementById("gamestatus").innerHTML = "<h6 style='font-size: 1em;'>Game Over</h6>";
    }  
	
	// Disables the click handler so the user can't click on the squares after the game ends.
	var disableCells = document.getElementById("puzzlegame");
	var cells = disableCells.getElementsByTagName("img");
	for (var i = 0; i < cells.length; i++) {
		var cell = cells[i];
		cell.onclick = "";	
	}
    
	// Calls the function to show fastest times.
    fastestWinners();
}

// This function operates the scroll box on the screen.
function otherPuzzlesScroll() {
    var otherPuzzles = document.getElementById("puzzlescroll");
    var images = otherPuzzles.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
        
		// Gets the style top values to scroll the images up the screen in the box.
        var top = images[i].style.top.substr(0, images[i].style.top.length - 2);
        if (top <= -100) {
            top = 400;
        }
        
        images[i].style.top = (top -1) + "px";        
        
    }
}

// Runs the new game function.
function startNewGame() {

	// Creates a new server request.
	request = createRequest();
	if(request === null) {
		alert("Unable to make request.");
	} 
	
	// Sets the desired puzzle and sets up a call to the server to retrieve the desired puzzle.
	var puzzleRequest = "puzzle1";
	var url = "scripts/getPuzzleJSON.json";
	ajax_get(url, function(data) {
        initialShuffle(data[puzzleRequest]);
    });
}

// Function that parses the returned JSON object to be used to shuffle the pieces around.
function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            
            callback(data);
        }
    };
 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// Function that shuffles the puzzle pieces.
function initialShuffle(positionArray) {
    var positionsArray = positionArray;
    
	// There are 16 different values in the returned array object. 
	// The loop will run 8 times since the arrays that are used are then pulled from the array.
    for(var i = 0; i < 8; i++) {
		
		// Stores in the variables the two different img ids. The puzzle piece locations are 
		// random and will be different every time the game is played.
        position1 = positionsArray.splice(Math.floor((Math.random() * positionsArray.length)), 1);
		position2 = positionsArray.splice(Math.floor((Math.random() * positionsArray.length)), 1);
		
		// Calls the function that shuffles the puzzle pieces.
        shuffleBoxes(position1, position2);   
        
		// Once all the pieces are shuffled the positions or nulled so that the user can click
		// on the image blocks appropriately.
        position1 = null;
        position2 = null;        
    }
}

// This is the function that outputs the fastest scores to the screen.
function fastestWinners() {
	// Creates the request to the server.
    winnerRequest = createRequest();
    if(winnerRequest === null) {
		alert("Unable to create request.");
    } else {
        
		// Sets up the variables to make the call to the server.
		var times = "bestTimes";
        var url = "fastestTimesJSON.php?winners=" + escape(times);
        winnerRequest.onreadystatechange = displayWinners;
        winnerRequest.open("GET", url, true);
        winnerRequest.send(null);        
    }
} 

// Gets the JSON object from the server then calls the function to display the output.
function displayWinners(){
    if(winnerRequest.readyState == 4) {
        if(winnerRequest.status == 200) {
            var winnerDetails = JSON.parse(winnerRequest.responseText);
            outputFastestTimes(winnerDetails);
        }
    }
}

// The function that outputs the fastest winners. This function also changes the DOM
// by adding an H1 tag into the parent element. 
function outputFastestTimes(winnerDetails) {
    document.getElementById("picture").className = "disabled";
    document.getElementById("display").className = "active";
    var winnerOutput = document.getElementById("display");
    var createH1Tag = document.createElement("h1");
    var h1TagContent = document.createTextNode(winnerDetails.header);
	// Adds an H1 tag to the element with the id of display.
    winnerOutput.appendChild(createH1Tag);
	// Adds a text node to the H1 tag. This content is the header content of the JSOn object.
    createH1Tag.appendChild(h1TagContent);
    
	// Creates a list of p tags underneath the h1 tag that was created.
    for(var i = 0; i < winnerDetails.winners.length; i++) {
        var p = document.createElement("p");
        var pContent = document.createTextNode(winnerDetails.winners[i]);
        winnerOutput.appendChild(p);
        p.appendChild(pContent);   
    }
	
	// Starts the reset timer.
	var r = setInterval(resetTimer, 1000);
}

// The function that runs the reset timer.
function resetTimer() {
	document.getElementById('resettimer').className = " active";
	var resetTimer = document.getElementById("resettimer");
	var h1Tag = document.createElement("h1");
	
	resetCounter -= 1;
	
	// Checks to see if there is an h1 tag already in the element. If so then delete the h1 tag.
	if(resetTimer.getElementsByTagName("h1").length > 0) {
		var h1Location = resetTimer.getElementsByTagName("h1")[0];
		resetTimer.removeChild(h1Location);
	}
	
	// If the reset counter is less than 0 then reload the page to start the game over.
	if (resetCounter < 0) {
		location.reload();
	// If not then create an h1 tag with the new resetCounter number to display to the screen.
	} else {
		var p = document.createTextNode(resetCounter);
		resetTimer.appendChild(h1Tag);
		h1Tag.appendChild(p);	
	}	
}
    

    

    

   



