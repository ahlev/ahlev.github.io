//arrays of top coins and symbols for widget
var topCoins = ["bitcoin", "litecoin", "etherium", "bitcoin cash", "xrp", "stellar", "tether", "iota", "cardano"];
var topCoinsSym = ["COINBASE:BTCUSD", "KRAKEN:LTCUSD", "KRAKEN:ETHUSD", "KRAKEN:BCHUSD", "KRAKEN:XRPUSD", "KRAKEN:XLMUSD", "KRAKEN:USDTUSD", "BINANCE:IOTABTC", "BITTREX:ADABTC"]

//images/icons of topTenCoins
var topTenImages = [
    '<img src="assets/images/btc.svg">',
    '<img src="assets/images/ltc.svg">',
    '<img src="assets/images/eth.svg">',
    '<img src="assets/images/bch.svg">',
    '<img src="assets/images/xrp.svg">',
    '<img src="assets/images/xlm.svg">',
    '<img src="assets/images/usdt.svg">',
    '<img src="assets/images/miota.svg">',
    '<img src="assets/images/ada.svg">',

];

//array to push user choices to - used to generate graphs to display
var userCoinChoice = [];

//loop to create images and append to page
for (var i = 0; i < topCoins.length; i++) {

    var newDiv = $("<div>").html(topTenImages[i] + topCoins[i]);
    newDiv.attr("data-name", topCoins[i]);
    newDiv.attr("data-sym", topCoinsSym[i]);
    newDiv.addClass("d-inline cryptoIcon m-2");
    $("#icons").append(newDiv);

};

//places border around selection and pushes to array
// no duplicates allowed

$(".cryptoIcon").on("click", function () {

    

    var userChoice = $(this).attr("data-name");

    var index = userCoinChoice.indexOf(userChoice);
    
//if (index !== -1) array.splice(index, 1);   

    if (index === -1) {
        $(this).addClass("border border-success");

        userCoinChoice.push(userChoice);

    } else if (index !== -1) {
        $(this).removeClass("border border-success");

        userCoinChoice.splice(index, 1);
    }

    console.log(userCoinChoice);

    });


$("#btnGo").on("click", function () {

    $("#graphs").text(userCoinChoice);

})


function initAutocomplete() {   

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7127, lng:-73.935},
        zoom: 10,
        mapTypeId: 'roadmap'
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
        });
    }



    var queryURL = 'https://www.coinatmfinder.com/CoimATMs-API.php'

        //ajax call for ATM location data
        $.ajax({
            url: queryURL,
            method: "GET", 

        }).then(function(response) {  // When the API is called, run this function...

            var data = JSON.parse(response); // Parse the results nicely into JSON format


            for (var i = 0; i < data.length; i++) { // Loop through JSON and create markers at latLng
              var latLng = new google.maps.LatLng(data[i].lat, data[i].lng);
              var marker = new google.maps.Marker({
                position: latLng,
                map: map
              });
            }
        });
            

   
    
    // Define the function that adds markers to the map we're creating
    // function addMarker(coords) {
    //     var marker = new google.maps.Marker({
    //         position: coords,
    //         map: map,
    //     })
    // }

    // // Define the for-loop to cycle through coords array and add markers for each lat:lng object, using the addMarker function
    // for (var i=0; i < coords.length; i++) {
    //     addMarker(coords[i]);
    // }  

    // Create the search box input from the API and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }

