/////
// EDAMAM API SEARCH WITH KEYWORD
/////

var long;
var lat;

// grab user location on page load
window.onload = function() {
    if ("geolocation" in navigator) {
        // check if geolocation is supported/enabled on current browser
        navigator.geolocation.getCurrentPosition( function success(position) {
            console.log('latitude', position.coords.latitude, 
                       'longitude', position.coords.longitude);
            lat = position.coords.latitude;
            long = position.coords.longitude;
        }, function error(error_message) {
            // for when getting location results in an error
            console.error('An error has occured while retrieving location', error_message)
            ipLookUp()
        });
    } else {
        console.log('geolocation is not enabled on this browser');
        ipLookUp();
    }
};
  
var Edamam = {
    URL: "https://api.edamam.com/search?",
    app_id: ['ce21ee88', '520c98f5', '3ff2cec1'],
    app_key: ['6acf93ffdefda4479aa332299d1492c4','c62e2a4f261a2553730816962b096921','5daaa38e313d46e5ddf1d70317e69608'],
    searchedItems: [],
    randItems: [],
    options: ['chinese','italian','french','korean','cuban','mexican','japanese','bbq','meat','tofu','vegeterian','oxtail','fish','bacon','bread','egg','goat','vegetables','turkey','duck','geese','gyro'],
    $RandCtnr: "",
    $RandomFood: "",
    callback: null,
    setCallback: function(callback) {
        this.callback = callback;
    },
    buildQueryURLRand: function() {
        var queryURL = this.URL + "app_id=" + this.app_id[2] + "&app_key=" + this.app_key[2] + "&";
        var queryParams = {};
        var randPickNum = Math.floor( Math.random() * this.options.length);
        queryParams.q = this.options[randPickNum];
        queryParams.from = Math.floor(Math.random() * 5);
        queryParams.to = queryParams.from + 1;
        queryURL += $.param(queryParams);
        return queryURL;
    },
    buildQueryURLSearch: function(keyword) {
        var queryURL = this.URL + "app_id=" + this.app_id[1] + "&app_key=" + this.app_key[1] + "&";
        var queryParams = {};
        queryParams.q = keyword;

        queryParams.from = Math.floor(Math.random() * 50);
        queryParams.to = queryParams.from + 1;
        queryURL += $.param(queryParams);
        return queryURL;

        // buildQueryURLSearch: function(keyword, diet, health, calories, excluded) {
        //!!! for detail search
        // queryParams.diet = diet || "";
        // queryParams.health = health || "";
        // queryParams.calories = calories || "";
        // queryParams.excluded = excluded || "";
    },
    
    callAjax: function(keyword) {
        $.ajax({
            url: this.buildQueryURLSearch(keyword),
            method: "GET"
        }).then( function(response) {
            Edamam.getData(response);
            // this.callback();     //!!! displaySearchedItems runs before callAjax.  Trying to run callback on Ajax.
            console.log(Edamam.searchedItems);
            // console.log(Edamam.searchedItems[0]);
        });
    },

    // PUSHING THIS ITEM INFO TO edamam.searchedItems[]
    getData: function (Data) {    
        var newItem = {};
        newItem.label = Data.hits[0].recipe.label;
        newItem.image = Data.hits[0].recipe.image;
        newItem.dietLabels = Data.hits[0].recipe.dietLabels;
        newItem.calories = Data.hits[0].recipe.calories;
        newItem.ingredients = Data.hits[0].recipe.ingredients;
        this.searchedItems.unshift(newItem);
    }
};

$(document).on("click", '.food-img', function (event){
    event.preventDefault();
    console.log(this);
    console.log($(this).attr("name"));
    var foodItem = $(this).attr("name");
    var foodImg = $(this).attr('src');
    var proxyURL = 'https://shielded-hamlet-43668.herokuapp.com/'
    var queryURL = "https://api.yelp.com/v3/businesses/search?term=" + foodItem + "&latitude=" + lat + "&longitude=" + long;
    $.ajax({
        url: proxyURL + queryURL,
        method: "GET",
        "headers": {
            "authorization": "Bearer aXBYOEZ2urYrK_dgFfaCQyg96ftnMSPopRdFnFxEMu7ndPT-WYFcQ4CFuBjlmpHmLxrPC8cpKlHrVN5mrySh8FnXsTI-VPIBrI9tVD6qN0qGtM0n_K1ZncYU0R89W3Yx",
        }
    }).then( function(response) {
        // $(".result-item-pic").attr("src", response.businesses[0].image_url);
        console.log(response);
        console.log(response.businesses[0]);
        
        var businessLat = response.businesses[0].coordinates.latitude;
        var businessLong = response.businesses[0].coordinates.longitude;
        $(".item-img").attr("src", foodImg);
        $(".result-item-pic").attr("src", response.businesses[0].image_url);
        $("#res-info").text(response.businesses[0].name + " (" + response.businesses[0].price + ")");
        $(".yelp-link").attr("href", response.businesses[0].url);
        $("#recipe-name").text(foodItem);
        $(".res-category").text(response.businesses[0].categories[0].title + " (Yelp rating: " + response.businesses[0].rating + ")");
        // $("#stars").text(response.businesses[0].rating);
        $(".food-price").text("Price Range : " + response.businesses[0].price);
        $(".phone").text(response.businesses[0].display_phone);
        $(".address").text(response.businesses[0].location.address1 + ", " + response.businesses[0].location.city + ", "
                           + response.businesses[0].location.state  + "-" +  response.businesses[0].location.zip_code);

        for (var i = 0; i < response.businesses[0].transactions.length; i++){
            if (response.businesses[0].transactions[i] == "delivery"){
                $(".delivery").css("background-color", "#63FC88");
            }
            if (response.businesses[0].transactions[i] == "takeout"){
                $(".takeout").css("background-color", "#63FC88");
            }
        }
            
        /* Generate map and add it onto the 'Map' id */
        var myLatlng = new google.maps.LatLng(businessLat, businessLong);
        var mapOptions = {
            zoom: 16,
            center: myLatlng
        }
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title: response.businesses[0].name
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
    });
})

function ipLookUp () {
    $.ajax('http://ip-api.com/json')
    .then(
        function success(response) {
            long = response.lon;
            console.log('long: ', long);
            lat = response.lat;
            console.log('lat: ', lat);
            
  },
        function fail(data, status) {
            console.log('Request failed.  Returned status of',
                        status);
        }
    );
  }






