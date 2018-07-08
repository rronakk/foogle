
// Commented things with temp setup with //!!!


///// INTRO PAGE
$(document).ready(function () {
    
    //pageAction
    IntroAction();
    
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

// DETAIL SEARCH TOGGLE ON/OFF
$(document).on("click", '#detail-search', function () {
    $('.detail-search-form').toggle();
});

///// INTRO PAGE && SEARCH RESULT PAGE
// DISPLAY ITEMS ON SEARCHED RESULT PAGE AND SAVE THEM IN edamam.searcheditems
$(document).on("click", '.run-search', function (event) {
    
    //pageAction
    RunSearchAction();
    
    event.preventDefault();
    var search = $('#searchItem').val().trim();
    console.log(Edamam.buildQueryURLSearch(search));
    // Edamam.setCallback(displaySearchedItems.bind(displaySearchedItems));     //!!! displaySearchedItems runs before callAjax.  Trying to run callback on Ajax.
    Edamam.callAjax(search);
    displaySearchedItems();
});

var displaySearchedItems = function () {

    // food item img
    var $itemImg = $('<img>');
    var itemImg = Edamam.searchedItems[0].image;
    $itemImg.attr("data-target", "#modelId");
    $itemImg.attr("data-toggle", "modal");
    if (itemImg) {
        $itemImg.attr('src', itemImg);
    }
    
    // food item name
    var $itemName = $("<h5>");
    $itemName.addClass('food-name card-body');
    var itemName = Edamam.searchedItems[0].label;
    if (itemName) {
        $itemImg.attr('name', itemName);
        $itemName.html(itemName.toUpperCase());
    }

    // ------------------------------------------------------------ UNCOMENT AND TEST FOR ADDING ITEM TO MODAL/ ALSO UNCOMMEND LINE 45 data-target=".search-modal"
    // var test = "TEST";
    // // container for food img and name 
    // var $itemContainer = $('<div>');
    // $itemContainer.addClass("item-ctnr card");
    // // append to container
    // $itemContainer.append($itemImg);
    // //!!! add btn to the container
    // // append to modal
    // $('#searched-item').append($itemContainer);
    // $('#searched-item-info').append($itemName);
    // $('#searched-item-info').append(test);
    // ------------------------------------------------------------ UNCOMENT AND TEST FOR ADDING ITEM TO MODAL/ ALSO UNCOMMEND LINE 45 data-target=".search-modal"



    // container for food img and name 
    var $foodCtnr = $('<div>');
    $foodCtnr.addClass("food-ctnr card");
    // append to container
    $foodCtnr.append($itemImg);
    $foodCtnr.append($itemName);
    // append to body
    $('.searched-item-area').append($foodCtnr);

}
            
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


