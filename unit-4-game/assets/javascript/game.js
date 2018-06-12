// GLOBAL VARIABLES 
//==================================

var gem1 = 0;
var gem2 = 0;
var gem3 = 0;
var gem4 = 0;
var totalScore = 0;
var targetScore = 0;

var winCount = 0;
var lossCount = 0;



// FUNCTIONS 
//==================================
$("#instructionBox").html("THIS IS WHERE THE GAME INSTRUCTIONS GO </br> I'm using jQuery to define HTML content in this section <br></br> Click the gems to capture points! </br></br> Try and EXACTLY match your score to the number in the green box to win!");

$("gem1").html(gem1);
$("gem2").html(gem2);
$("gem3").html(gem3);
$("gem4").html(gem4);

function startGame() {
    newTargetScore();
    newGemValues();
    totalScore = 0;
}

function refreshPage() {
    $('#scoreKeeper').hide().show(0);
    $('#totalScore').hide().show(0);
}

function newTargetScore() {
    targetScore = Math.floor(Math.random() * 101) + 19;
    $("#targetScore").html(targetScore);
    totalScore = 0;
    $("#totalScore").html(totalScore);
}

function newGemValues() {
    gem1 = Math.floor(Math.random() * 10) +2;
    gem2 = Math.floor(Math.random() * 10) +2;
    gem3 = Math.floor(Math.random() * 10) +2;
    gem4 = Math.floor(Math.random() * 10) +2;
}

function newTotalScore(gem) {
    totalScore = totalScore + gem;
    $("#totalScore").html(totalScore);
    // ("<div class=&quot;col-xs-3&quot;><p>Your Score: " + totalScore + "</p></div>");
}

function checkScore() {
    if (totalScore === targetScore){
        winCount++;
        $("#scoreKeeper").html("<p>wins: "+ winCount +"</p><p>losses: "+ lossCount +"</p>");
        alert("You got yourself a WIN!");
        startGame();
        refreshPage();
        
    } else if (totalScore > targetScore) {
            lossCount++;
            $("#scoreKeeper").html("<p>wins: "+ winCount +"</p><p>losses: "+ lossCount +"</p>");
            alert("Well... this is awkward... YOU BLEW IT!");
            
            startGame();
            refreshPage();
        }
            
    }


$("#gem1").on("click", function(){
    newTotalScore(gem1);
    checkScore();
})

$("#gem2").on("click", function(){
    newTotalScore(gem2);
    checkScore();
})

$("#gem3").on("click", function(){
    newTotalScore(gem3);
    checkScore();
})

$("#gem4").on("click", function(){
    newTotalScore(gem4);
    checkScore();
})


startGame();


console.log("gem 1: " + gem1);
console.log("gem 2: " + gem2);
console.log("gem 3: " + gem3);
console.log("gem 4: " + gem4);

