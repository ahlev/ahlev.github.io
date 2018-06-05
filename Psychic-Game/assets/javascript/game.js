//establish an array of letters for the computer to randomly choose from. (That randomization function is still confusing... ***come back to it***)
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//set the starting value for wins and losses
var wins = 0;
var losses = 0;

//establish variables for guessesLeft, guessedLetters, computerGuess. These will still need to be defined within my functions.
var guessesLeft, guessedLetters, computerGuess;

//run the resetGame function, which assigns the default start values to "guessesLeft" and "guessedLetters" variables (10 and empty array, respectively)
resetGame();
//then run the displayScore function, which uses .innerHTML to visually present the text + javascript variable values on the page
displayScore();

//set the event (key press) that triggers the script to run. We did this with the in-class RPS example using onkeyup instead of onkeypress.
//with onkeypress, we can hold a key down and trigger it repeatedly indefinitely (apparently)
document.onkeypress = function(event) {
  var playerGuess = event.key;

    //if the player and computer guess the same, run the win function (adds +1 to win value, then runs the reset function to reset guessesLeft and guessedLetters values)
    if (playerGuess === computerGuess) {
        win();
    } 

    //otherwise, if we just used our 10th guess and guessesLeft value down to 0, run the lose function (+1 to loss value, then runs the reset function)
    else if (guessesLeft - 1 === 0) {
        lose();
    } 

    //otherwise (if you didn't win and still have guessesLeft above 0, keep going)
    else {
        keepGoing(playerGuess);
    }

//each time the document.onkeypress function runs, run the displayScore function again to show updated values
displayScore();
}

//set variables to be displayed as HTML using .innerHTML. ***Still a little unclear exactly how this works***, but got it to do what I wanted
//the Id seems to be what HTML latches on to.
function displayScore() {
  var winsDisplay = document.getElementById("wins");
  var lossesDisplay = document.getElementById("losses");
  var guessLeft = document.getElementById("guessLeft");
  var letterGuessed = document.getElementById("guessed");
    //then paid the Id with .innerHTML and specify the text + variables to present on-screen (tied to the html document)
    winsDisplay.innerHTML = "Wins: " + wins;
    lossesDisplay.innerHTML = "Losses: " + losses;
    guessLeft.innerHTML = "Guesses Remaining: " + guessesLeft;
    letterGuessed.innerHTML = "Your Guesses So Far: " + guessedLetters.join(", ");
}

//Defines a function to continue playing, subtracting -1 from the guessesLeft variable and adds the onkeypress value to the guessedLetters array
function keepGoing(letter) {
  guessesLeft--;
  guessedLetters.push(letter);
}

//Defines a function that adds +1 to loss total, then resets the game (sets guessesLeft and guessedLetters back to default values)
function lose() {
  losses++;
  resetGame();
}

//Defines a function that adds +1 to win total, then resets the game (sets guessesLeft and guessedLetters back to default values)
function win() {
  wins++;
  resetGame();
}

//redefine guessesLeft to default value of 10 and guessedLetters to an empty array. 
//Establish a new randomly-chosen computerGuess value (letter) from the array
function resetGame() {
  guessesLeft = 10;
  guessedLetters = [];
  computerGuess = letters[Math.floor(Math.random() * letters.length)];
}