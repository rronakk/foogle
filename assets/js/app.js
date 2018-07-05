///// INTRO PAGE
$(document).ready(function () {
    
    // $('.result').hide();
    $('.intro_2').hide();
    setTimeout( function () {
        $('.intro_1').fadeOut(2000);
        $('.intro_2').fadeIn(4000);
    }, 3000);
    $('.searched-item-page').hide();
    $('.random-item-page').hide();
    $('.fav-item-page').hide();
    $('.page-navigation').hide()
    $('.page-tab').hide();
    $('.michael-eg').hide();

    
    /////
    // LOADING RANDOM FOOD FROM EDAMAM
    /////    
    // var edamamURL = edamam.buildQueryURLRand();
    // $.ajax({
    //     url: edamamURL,
    //     method: "GET"
    // }).then( function(response) {
    //     edamam.getRand(response);
    // });


    /////
    // GIPHY API CALL FOR FOOD DATING
    /////    
    var giphyURL = giphy.buildQueryURL("delicious");
    $.ajax({
        url: giphyURL,
        method: "GET"
    }).then( function(response) {
        giphy.updateGifImg(response)
        $('#enjoyYourFoodDating').append(giphy.$gif);
    });
    var $FoodDatingNote = $('<h1 id="datingNote">Enjoy your<br/>DELICIOUS date.<br>Ready to TASTE it?!<br>"LIKE" it!!<br><br>You will see them on your list!</h1>');
    $('#enjoyYourFoodDating').append($FoodDatingNote);
});

///// RESULT PAGE
// PAGE CHANGE WITH page-tab BTN
$(document).on('click', '.page-tab-btn', function () {
    var tab = $(this).attr("id");
    if (tab === 'searched-page') {
        $('.searched-item-page').show();
        $('.random-item-page').hide();
        $('.fav-item-page').hide();
    } else if (tab === 'random-page') {
        $('.searched-item-page').hide();
        $('.random-item-page').show();
        $('.fav-item-page').hide();
    } else if (tab === 'fav-page') {
        $('.searched-item-page').hide();
        $('.random-item-page').hide();
        $('.fav-item-page').show();
    }
});

///// RESULT PAGE
// MOVE ITEM TO FAVORITES PAGE
$(document).on('click', '.fav-btn', function () {
    event.preventDefault();
    var $foodCtnr = $(this).parent();
    var fav = $(this).attr("fav");
    if (fav === 'false') {   
        $(this).css("color", 'rgba(0, 0, 0, 1)');
        $(this).attr('fav', 'true');
        $('.fav-item-area').append($foodCtnr);
    }
    if (fav === 'true') {
        $(this).css("color", 'rgba(0, 0, 0, 0.4)');
        $(this).attr('fav', 'false');
        $foodCtnr.remove();
        // $('.searched-item-area').prepend($foodCtnr);
    }
});

///// SEARCH RESULT PAGE
// DETAIL SEARCH TOGGLE ON/OFF
$(document).on("click", '#detail-search-header', function () {
    $('.detail-search-form').toggle();
    $('.random-date').toggle();
});

///// SEARCH RESULT PAGE
// DISPLAY ITEMS ON SEARCHED PAGE AND SAVE THEM IN edamam.searcheditems
$(document).on("click", '.search-result-btn', function (event) {
    $('.searched-item-page').prepend('<h1 class="col-12">Here is our recommendation on: ' + $('#searchItem').val().trim().toUpperCase() + '</h1>');
    $('.banner_intro').fadeOut(1000);
    $('.result').show();
    $('.searched-item-page').fadeIn(2000);
    $('.page-navigation').fadeIn(2000);
    $('.page-tab').fadeIn(4000);

    event.preventDefault();
    var search = $('#searchItem').val().trim();
    // offset += 10;

    var queryURL = edamam.buildQueryURLSearch(search);
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then( function(response) {
        edamam.updateSearchedFood(response);
    });
});



/////
// TEMPLATE FOR RANDOM FOOD API CALL
/////
$(document).on("click", '.temp-btn', function (event) {
    event.preventDefault();

    var giphyURL = giphy.buildQueryURL("delicious");
    $.ajax({
        url: giphyURL,
        method: "GET"
    }).then( function(response) {
        giphy.updateGifContainer(response);
        $('#food-item-slide').append(giphy.$gifContainer);
    });
});



/////
// EDAMAM API SEARCH WITH KEYWORD
/////
var edamam = {
    URL: "https://api.edamam.com/search?",
    app_id: '3ff2cec1',
    app_key: '5daaa38e313d46e5ddf1d70317e69608',
    searchNum: 6,
    searchedItems: [],
    randItems: [],
    $RandCtnr: "",
    $RandomFood: "",
    buildQueryURLSearch: function(keyword) {
        var queryURL = this.URL + "app_id=" + this.app_id + "&app_key=" + this.app_key + "&"
        var queryParams = {};
        queryParams.q = keyword;
        queryParams.from = 0;
        queryParams.to = queryParams.from + this.searchNum;
        queryURL += $.param(queryParams);
        return queryURL;
    },

    updateSearchedFood: function (Data) {
        console.log(Data);
        for (var i = 0; i < this.searchNum; i++) {

            // PUSHING THIS ITEM INFO TO edamam.searchedItems[]
            var foodInfo = Data.hits[i];
            var newItem = {};
            newItem.label = foodInfo.recipe.label;
            newItem.image = foodInfo.recipe.image;
            newItem.dietLabels = foodInfo.recipe.dietLabels;
            newItem.calories = foodInfo.recipe.calories;
            newItem.ingredients = foodInfo.recipe.ingredients;
            this.searchedItems.push(newItem);

            // container for food item and name
            var $foodCtnr = $('<div>');
            $foodCtnr.addClass("food-ctnr card");
            $('.searched-item-area').append($foodCtnr);
            // food item img
            var $item = $('<img>');
            $item.addClass("food-img card-img-top");
            var foodImg = foodInfo.recipe.image;
            if (foodImg) {
                $item.attr('src', foodImg);
            }
            // food item name
            var $foodName = $("<h5>");
            $foodName.addClass('food-name card-body');
            var foodName = foodInfo.recipe.label;
            if (foodName) {
                $item.attr('name', foodName);
                $foodName.html(foodName.toUpperCase());
            }
            // favorite btn
            var $fav = $('<button>');
            $fav.addClass('fav-btn');
            $fav.attr('fav', false);
            $fav.html('&#x2764;');

            // append to container
            $foodCtnr.append($item);
            $foodCtnr.append($foodName);
            $foodCtnr.append($fav);
        }
    }
};

/////
// RANDOM GIF IMAGE WITH KEYWORD
/////
var giphy = {
    $gif: "",
    $gifContainer: "",
    buildQueryURL: function(keyword) {
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&";
        var queryParams = {};
        queryParams.tag = keyword;
        return queryURL + $.param(queryParams);
    },
    updateGifImg: function(GifData) {
        var gif = GifData.data;
        this.$gif = $('<img>');
        // $gif.addClass("img-fluid");
        var originalURL = gif.images.original.url;
        if (originalURL) {
            this.$gif.attr('src', originalURL);
        }
    },
    updateGifContainer: function(GifData) {
        this.updateGifImg(GifData);
        this.$gifContainer = $('<div>');
        this.$gifContainer.addClass("food-item carousel-item");    
        this.$gifContainer.append(this.$gif);    

        // carousel closing btn note
        var $FoodResultNote = $('<btn id="resultNote" data-dismiss="modal"><h1>Click to Show My Result</h1></btn>');
        this.$gifContainer.prepend($FoodResultNote);
    }
}







