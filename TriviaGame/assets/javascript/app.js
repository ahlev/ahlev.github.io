
// When the document is loading, hide the questions and make the #start-button an event trigger
$(document).ready(function(){
    $(".question-section").hide();
    $("#finished-section").hide();
    $("#counter").hide();

    $("#start-button").click(function(){
  // ----------------------------------------------------------------
   // declaring the value for the timer to 60 seconds
   // hide the start button and rules
        var number = 30;
        alert("And awwwaaaaAaaaaayyyyyyyy we go!");
      $("#start-button").on("click", start);  // starts the games 
      $("#submit").on("click", finish);  // submits answers and finishes the game
      $("#restart-button").on("click", start);  // restarts the games 
  // ----------------------------------------------------------------
  // functions
        // scripted this section using manually made showMe and hideMe function
        // could have just used $(#name).show() syntax like the others.
        function start(){
            number = 30;
            counter = setInterval(timer, 1000);
            showMe("#counter");
            showMe(".question-section");
            showMe(".answers");
            showMe("#submit");
            hideMe("#start-button");
            hideMe(".rules");
            hideMe("#restart");
            hideMe("#results");
            hideMe("#finished-section");
        }
        
        function timer(){
        number--; // decrements the timer by 1
            $("#show-number").html("<h3> Time remaining: <br \>" + number + " seconds</h3>" );
                if (number === 0){
                    alert("Time's up!")
                    $("#show-number").html("<h3>You ran <br \>out of time!</h3>" );
                    stop();
                }
            }

        function stop(){
            clearInterval(counter); // function that stops the timer
            $("#finished-section").show(); 
            $(".question-section").hide();
            $(".answers").hide();
            $("#submit").hide();
            $("#restart").on("click", restart); 

// I found this block of loops with Google-Fu and made tweaks to get it working right for my application,
// but I would definitely still struggle to logically produce this on my own..
          var numCorrect = 0;
            for(var i = 1; i <= 5; i++) {
                 var radios = document.getElementsByName("q" + i);

                for(var j = 0; j < radios.length; j++) {
                    var radio = radios[j];
                    if(radio.value === "correct" && radio.checked) {
                    numCorrect++;
                    // console.log("Number right: " + numCorrect);
                    }
                }
            }
            
            var numWrong = 0;
            for(var k = 1; k <= 5; k++) {
                 var radios = document.getElementsByName("q" + k);

                for(var l = 0; l < radios.length; l++) {
                    var radio = radios[l];
                    if(radio.value === "wrong" && radio.checked) {
                    numWrong++;
                    // console.log("Number wrong: " + numWrong);
                    }
                }
            }
            
            for(var k = 0; k <= 5; k++) {
                var radios = document.getElementsByName("q" + k);
                numQuestions = radios.length + 1;
                // console.log("NUM QUESTIONS " + numQuestions)
            }

            var numUnanswered = numQuestions - (numCorrect + numWrong);
                // console.log("you left " + numUnanswered + "unanswered");

                
            $("#numberCorrect").html(numCorrect);
            $("#numberWrong").html(numWrong);
            $("#numberUnanswered").html(numUnanswered);

      }

      function finish(){
        stop();
        clearInterval(counter);
        $("#finished-section").show();
        timer();

            if (number > 0) {
                $("#show-number").html("<h3> Finished with <br \>" + number + " secs to spare!</h3>" );
            }
      }
  
      function restart(){
          number = 50;
          start();
      }


      // not necessary, but functions fine -- testing using functions to handle jquery html replacement
      function hideMe(e) {
          $(e).hide();
      }
    
      // not necessary, but functions fine -- testing using functions to handle jquery html replacement
      function showMe(e) {
          $(e).show();
      }

     
  // ----------------------------------------------------------------
  //calling functions
        start(); // calls the start function
    });
  });
  
  