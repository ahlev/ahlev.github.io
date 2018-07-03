  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDDTvZkl2GEKiRmJafiUWNVy0nnqX5iXh4",
    authDomain: "alextestdb.firebaseapp.com",
    databaseURL: "https://alextestdb.firebaseio.com",
    projectId: "alextestdb",
    storageBucket: "alextestdb.appspot.com",
    messagingSenderId: "579624524155"
  };

    // standard step of initializing firebase
    firebase.initializeApp(config);

    // set the firebase database result equal to a variable
    // we will use this variable when PUSHING newly added data into the table
    var database = firebase.database();

    // ESTABLISH DATA CAPTURE EVENT LISTENER FOR .add-train-button
    $(".add-train-button").on("click", function(event) {
        event.preventDefault();

        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrain = $("#first-train-time-input").val().trim();
        var frequency = $("#train-frequency-input").val().trim();

        var newTrain = {
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            nextTrain: nextTrainFormatted,
            minutesAway: minutesAway,
            nextTrainFormatted: nextTrainFormatted
            
        }
        
        if (trainName === "" || destination === "" || firstTrain === "" || frequency === "") {
          alert("All fields are required to add a new train!");
        }
        else {
          database.ref().push(newTrain);
        }
        
        // DEBUGGING
            // console.log("train name is: " + newTrain.name);
            // console.log("train destination is " + newTrain.destination);
            // console.log("first train leave at: " + newTrain.firstTrain);
            // console.log("Train runs every " + newTrain.frequency + " minutes");

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-time-input").val("");
        $("#train-frequency-input").val("");
    });



database.ref().on("child_added", function(trainsSnapshot, prevChildKey) {
  console.log(trainsSnapshot.val());

  // Store everything into a variable.
  var trainName = trainsSnapshot.val().name;
  var trainDestination = trainsSnapshot.val().destination;
  var trainFirst = trainsSnapshot.val().firstTrain;
  var trainRate = trainsSnapshot.val().frequency;

  
//I had a hard time with the application of moment.js... but got most of it in the end.

      //establish the current time (page load) as a variable
      currentTime = moment();

      trainFirstConverted = moment(trainFirst, "hh:mm").subtract(1, "years");
      diffTime = moment().diff(moment(trainFirstConverted), "minutes");
      tRemainder = diffTime % trainRate;
      minutesAway = trainRate - tRemainder;

        nextTrain = moment().add(minutesAway, "minutes");
        nextTrainFormatted = moment(nextTrain).format("hh:mm");



  // Add each train's data into the table in the DOM
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainRate + "</td><td>" + nextTrainFormatted + "</td><td>" + minutesAway 
    +  "<td input type='submit' value='Edit Train' class='edit-train tablebuttons btn btn-secondary'>Edit</button>" + "</td>"
    +  "<td input type='submit' value='Remove Train' class='remove-train tablebuttons btn btn-warning'>Remove</button>" + "</td></tr>");
});

// create buttons for removing trains...
$("body").on("click", ".remove-train", function(){
  $(this).closest ('tr').remove();
  getKey = $(this).parent().parent().attr('id');
  dataRef.child(getKey).remove();
  
});

// ...and editing all of the table cells within the row
$("body").on("click", ".edit-train", function(){
  var currentTD = $(this).parents('tr').find('td');
      
      $.each(currentTD, function () {
          $(this).prop('contenteditable', true)
  }); 
  $(this).html($(this).html() == 'Edit' ? 'Save' : 'Edit')
});


// $('#form').submit(function() {
//   if ($.trim($("#train-name-input").val()) === "" || $.trim($("#destination-input").val()) === "" || $.trim($("#first-train-time-input").val()) === "" || $.trim($("#frequency-input").val()) === "") {
//       alert('you did not fill out one of the fields');
//       return false;
//   }
// });




