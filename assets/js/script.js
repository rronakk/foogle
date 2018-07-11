
///// INTRO PAGE
$(document).ready(function () {
    
    //pageAction
    IntroAction();
    
    // // GIPHY API CALL FOR FOOD DATING FIRST BANNER PAGE
    // var giphyURL = Giphy.buildQueryURL("delicious");
    // $.ajax({
    //     url: giphyURL,
    //     method: "GET"
    // }).then( function(response) {
    //     Giphy.updateGifImg(response)
    //     $('#enjoyYourFoodDating').append(Giphy.$gif);
    // });
    // var $FoodDatingNote = $('<h1 id="datingNote">Enjoy your<br/>DELICIOUS date.<br>Ready to TASTE it?!<br>"LIKE" it!!<br><br>You will see them on your list!</h1>');
    // $('#enjoyYourFoodDating').append($FoodDatingNote);
});




// CLICKING ON LIKE BTN (RANDOM MODAL)
// $(document).on("click", '#rand-like', function (event) {

//     $('.rand-item').addClass('animated zoomOutRight');
    // var $likedName = $('.rand-item-name').clone().removeClass();
    // var $likedImg = $('.rand-item-img').clone().removeClass();
    // $likedImg.attr('name', $likedName.text());
    // $likedImg.addClass('food-img');
    // $likedImg.attr("data-target", "#modelId");
    // $likedImg.attr("data-toggle", "modal");
    // var $likedDiet = $('.rand-item-dietLabels').clone().removeClass();
    // var $likedHealth = $('.rand-item-healthLabels').clone().removeClass();

    // var $likedItem = $('<div class="liked-item col-4 card">');
    // $likedItem.append($likedName);
    // $likedItem.append($likedImg);
    // $likedItem.append($likedDiet);
    // $likedItem.append($likedHealth);
    // $(".result-item-area").prepend($likedItem);
//     event.preventDefault();

//     $.ajax({
//         url: Edamam.buildQueryURLRand(),
//         method: "GET"
//     }).then( function(response) {
//         // console.log(response);
//         // console.log("randomURL: "+Edamam.buildQueryURLRand());

//         $('.rand-item').removeClass('zoomOutRight');
//         if (response.hits[0].recipe.label.toLowerCase().includes("recipe")) {
//             $('.rand-item-name').html(response.hits[0].recipe.label.replace("recipe", ""));
//         } else {
//             $('.rand-item-name').html(response.hits[0].recipe.label);
//         }
//         $('.rand-item-img').attr('src', response.hits[0].recipe.image);
//         if (response.hits[0].recipe.dietLabels !== "[]") {
//             $('.rand-item-dietLabels').text(response.hits[0].recipe.dietLabels);
//         }
//         if (response.hits[0].recipe.dietLabels !== "[]") {
//             $('.rand-item-healthLabels').text(response.hits[0].recipe.healthLabels);
//         }
//     });
// });



/// RANDOM MODAL
// DISPLAY RANDOM ITEMS ON MODAL (RANDOM MODAL)
$(document).on('click', '.run-random', function () {
    $('.rand-item').addClass('animated rotateOutDownLeft');
    RunSearchAction();
    event.preventDefault();

    $.ajax({
        url: Edamam.buildQueryURLRand(),
        method: "GET"
    }).then( function(response) {
        console.log("randomURL: "+Edamam.buildQueryURLRand());
        console.log(response);
        $('.rand-item').removeClass('rotateOutDownLeft');
        
        if (response.hits[0].recipe.label.toLowerCase().includes("recipe")) {
            $('.rand-item-name').html(response.hits[0].recipe.label.replace("recipe", ""));
        } else {
            $('.rand-item-name').html(response.hits[0].recipe.label);
        }
        $('.rand-item-img').attr('src', response.hits[0].recipe.image);
        if (response.hits[0].recipe.dietLabels !== []) {
            $('.rand-item-dietLabels').text(response.hits[0].recipe.dietLabels);
        }
        if (response.hits[0].recipe.dietLabels !== []) {
            $('.rand-item-healthLabels').text(response.hits[0].recipe.healthLabels);
        }
    });
});


// DISPLAY SEARCHED ITEMS ON MODAL
var CLICKEDBTN = null;
$(document).on("click", '.run-btn', function (event) {
    CLICKEDBTN = this;
    console.log(CLICKEDBTN);

    // IF LIKED
    if (CLICKEDBTN.id === 'search-like' || 'rand-like') {
        // likedName
        var $likedName = $('.searched-item-name').clone().removeClass();
        // likedImg
        var $likedImg = $('.searched-item-img').clone().removeClass();
        $('.searching-item').addClass('animated zoomOutRight');
        $likedImg.addClass('food-img');
        $likedImg.attr("data-target", "#modelId");
        $likedImg.attr("data-toggle", "modal");
        // likedDiet
        var $likedDiet = $('.searched-item-dietLabels').clone().removeClass();
        // likedItem (container)
        var $likedItem = $('<div class="liked-item col-4 card">');
        $likedItem.append($likedName);
        $likedItem.append($likedImg);
        $likedItem.append($likedDiet);
        $(".result-item-area").prepend($likedItem);

    // IF DISLIKED
    } else if (CLICKEDBTN.id === 'search-dislike') {
        $('.searching-item').addClass('animated rotateOutDownLeft');
    }

    RunSearchAction();

    // RUN AJAX
    event.preventDefault();
    var search = $('#searchItem').val().trim();
    Edamam.setCallback(displayItems);
    if ($(CLICKEDBTN).hasClass('run-search')) {
        Edamam.callAjaxKeyword(search);
    } else if ($(CLICKEDBTN).hasClass('run-random')) {
        Edamam.callAjaxRand();
    }
});

// AJAX CALL RESPONSE
var displayItems = function () {
    if (CLICKEDBTN.id === 'search-like') {
        $('.searching-item').removeClass('zoomOutRight');
    } else if (CLICKEDBTN.id === 'search-dislike') {
        $('.searching-item').removeClass('rotateOutDownLeft');
    }
    // food item img
    var $itemImg = $('<img>');
    $itemImg.addClass("searched-item-img col-12");
    $itemImg.attr("data-target", "#modelId");
    $itemImg.attr("data-toggle", "modal");
    var itemImg = Edamam.searchedItems[0].image;
    if (itemImg) {
        $itemImg.attr('src', itemImg);
    } 
    // food item name
    var $itemName = $('<h5 class="col-12 searched-item-name">');
    var itemName = Edamam.searchedItems[0].label;
    if (itemName) {
        $itemImg.attr('name', itemName);
        $itemName.html(itemName.toUpperCase());
    }
    // food item DietLabel
    var $itemDiet = $('<div class="col-12">');
    var $itemDietI = $('<i class="searched-item-dietLabels">');
    $itemDiet.html($itemDietI);
    var itemDiet = Edamam.searchedItems[0].dietLabels;
    if (itemDiet) {
        $itemDietI.text(itemDiet);
    }
    // container for food img, name, diet label 
    var $itemCtnr = $('<div class="searching-item row">');
    // append to container
    $itemCtnr.append($itemName);
    $itemCtnr.append($itemImg);
    $itemCtnr.append($itemDiet);
    // append to body
    $('.searching-item-area').html($itemCtnr);
}




// ///// NOT IN USE ----- FOR RANDOM RESULT PAGE && FAVORITE PAGE

// DETAIL SEARCH TOGGLE ON/OFF
// $(document).on("click", '#detail-search', function () {
//     $('.detail-search-form').toggle();
// });

// // PAGE CHANGE WITH page-tab BTN
// $(document).on('click', '.page-tab-btn', function () {
//     var tab = $(this).attr("id");
//     if (tab === 'searched-page') {
//         $('.searched-result-page').show();
//         $('.random-result-page').hide();
//         $('.fav-result-page').hide();
//     } else if (tab === 'random-page') {
//         $('.searched-result-page').hide();
//         $('.random-result-page').show();
//         $('.fav-result-page').hide();
//     } else if (tab === 'fav-page') {
//         $('.searched-result-page').hide();
//         $('.random-result-page').hide();
//         $('.fav-result-page').show();
//     }
// });

// // MOVE ITEM TO FAVORITES PAGE
// $(document).on('click', '.fav-btn', function () {
//     event.preventDefault();
//     var $foodCtnr = $(this).parent();
//     var fav = $(this).attr("fav");
//     if (fav === 'false') {   
//         $(this).css("color", 'rgba(0, 0, 0, 1)');
//         $(this).attr('fav', 'true');
//         $('.fav-item-area').append($foodCtnr);
//     }
//     if (fav === 'true') {
//         $(this).css("color", 'rgba(0, 0, 0, 0.4)');
//         $(this).attr('fav', 'false');
//         $foodCtnr.remove();
//         // $('.searched-item-area').prepend($foodCtnr);
//     }
// });


