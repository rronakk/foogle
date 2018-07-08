
// Commented things with temp setup with //!!!


///// INTRO PAGE
$(document).ready(function () {
    
    $('.result').hide();
    $('.intro_2').hide();
    /* setTimeout( function () {
        $('.intro_1').fadeOut(2000);
        $('.intro_2').fadeIn(4000);
    }, 3000); */
    setTimeout( function () {
        $('.intro_1').fadeOut(500);
        $('.intro_2').fadeIn(500);
    }, 500);
    $('.searched-result-page').hide();
    $('.random-result-page').hide();
    $('.fav-result-page').hide();
    $('.page-navigation').hide()
    $('.page-tab').hide();
    $('.michael-eg').hide();

    // GIPHY API CALL FOR FOOD DATING FIRST BANNER PAGE
    var giphyURL = Giphy.buildQueryURL("delicious");
    $.ajax({
        url: giphyURL,
        method: "GET"
    }).then( function(response) {
        Giphy.updateGifImg(response)
        $('#enjoyYourFoodDating').append(Giphy.$gif);
    });
    var $FoodDatingNote = $('<h1 id="datingNote">Enjoy your<br/>DELICIOUS date.<br>Ready to TASTE it?!<br>"LIKE" it!!<br><br>You will see them on your list!</h1>');
    $('#enjoyYourFoodDating').append($FoodDatingNote);
});

// DETAIL SEARCH ON CLICK EVENT
// $(document).on("click", '.detail-search', function (event) {

// });

// DISPLAY ITEMS ON SEARCHED RESULT PAGE AND SAVE THEM IN edamam.searcheditems
$(document).on("click", '#run-search', function (event) {
    $('.banner_intro').fadeOut(1000);
    $('.result').show();
    $('.searched-result-page').prepend('<h1 class="col-12">Here is our recommendation on: ' + $('#searchItem').val().trim().toUpperCase() + '</h1>');
    $('.searched-result-page').prepend($('.search-area'));
    $('.searched-result-page').fadeIn(2000);
    $('.page-navigation').fadeIn(2000);
    $('.page-tab').fadeIn(4000);

    event.preventDefault();
    var search = $('#searchItem').val().trim();
    var queryURL = Edamam.buildQueryURLSearch(search);
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then( function(response) {
        Edamam.updateSearchedFood(response);
    });
});


///// RANDOM MODAL PAGE
// CLICKING ON "SHOW MY RESULT" ON MODAL WILL RENDER TO FAVORITE RESULT PAGE 
//!!! temporarily using Giphy.updateGifContainer() to show random images
$(document).on('click', '.random-result-btn', function () {
    $('.banner_intro').fadeOut(1000);
    $('.result').show();
    $('.random-result-page').fadeIn(2000);
    $('.page-tab').fadeIn(4000);
});

// TEMPLATE FOR RANDOM FOOD API CALL
var getGiphyRand = function () {
    var giphyURL = Giphy.buildQueryURL("delicious");
    $.ajax({
        url: giphyURL,
        method: "GET"
    }).then( function(response) {
        Giphy.updateGifContainer(response);
        $('#food-item-slide').append(Giphy.$gifContainer);
    });
}
$(document).on("click", '.temp-btn', function (event) {
    event.preventDefault();
    getGiphyRand();
});


///// RESULT PAGE
// PAGE CHANGE WITH page-tab BTN
$(document).on('click', '.page-tab-btn', function () {
    var tab = $(this).attr("id");
    if (tab === 'searched-page') {
        $('.searched-result-page').show();
        $('.random-result-page').hide();
        $('.fav-result-page').hide();
    } else if (tab === 'random-page') {
        $('.searched-result-page').hide();
        $('.random-result-page').show();
        $('.fav-result-page').hide();
    } else if (tab === 'fav-page') {
        $('.searched-result-page').hide();
        $('.random-result-page').hide();
        $('.fav-result-page').show();
    }
});

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
$(document).on("click", '#detail-search', function () {
    $('.detail-search-form').toggle();
    $('.random-date').toggle();
});
