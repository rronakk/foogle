///// INTRO PAGE
$(document).ready(function() {
	//pageAction
	IntroAction();
});

// DISPLAY SEARCHED ITEMS ON MODAL
var CLICKEDBTN = null;
$(document).on('click', '.run-btn', function(event) {
	CLICKEDBTN = this;

	let x = $('#searchItem').val().length;
	// if (CLICKEDBTN.hasClass('run-search') && x === 0) {	// commented out for now
	// 	alert('Enter a food item!!!');

	// } else {
		RunSearchAction();
		// IF LIKED ON SEARCH
		if ($(CLICKEDBTN).hasClass('like')) {
			var $likedName, $likedImg, $likedDiet, $likedHealth;

			// likedName
			$likedName = $('.searched-item-name').clone().removeClass();
			// likedImg
			$likedImg = $('.searched-item-img').clone().removeClass();
			$('.added-item').addClass('animated zoomOutRight');
			$likedImg.addClass('food-img');
			$likedImg.attr("data-target", "#modelId");
			$likedImg.attr("data-toggle", "modal");
			// likedDiet
			var $likedDiet = $('.searched-item-dietLabels').clone().removeClass();
			// likedHealth
			var $likedHealth = $('.searched-item-healthLabel').clone().removeClass();
	
			// likedItem (container)
			var $likedItem = $('<div class="liked-item col-4 card">');
			$likedItem.append($likedName);
			$likedItem.append($likedImg);
			$likedItem.append($likedDiet);
			$likedItem.append($likedHealth);
			$(".result-item-area").prepend($likedItem);
	
		// IF DISLIKED ON SEARCH
		} else if ($(CLICKEDBTN).hasClass('dislike')) {
			$('.added-item').addClass('animated rotateOutDownLeft');
		}	
	
		// RUN AJAX
		event.preventDefault();
		var search = $('#searchItem').val().trim();
		Edamam.setCallback(displayItems);
		if ($(CLICKEDBTN).hasClass('run-search')) {
			Edamam.callAjaxKeyword(search);
		} else if ($(CLICKEDBTN).hasClass('run-random')) {
			Edamam.callAjaxRand();
		}
	// }
});

// AJAX CALL RESPONSE
var displayItems = function () {
    if ($(CLICKEDBTN).hasClass('like')) {
    // if (CLICKEDBTN.id === 'search-like') {
        $('.added-item').removeClass('zoomOutRight');
    } else if ($(CLICKEDBTN).hasClass('dislike')) {
    // } else if (CLICKEDBTN.id === 'search-dislike') {
        $('.added-item').removeClass('rotateOutDownLeft');
    }

    if ($(CLICKEDBTN).hasClass('run-search')) {
        var itemImg = Edamam.searchedItems[0].image;
        var itemName = Edamam.searchedItems[0].label;
        var itemDiet = Edamam.searchedItems[0].dietLabels;
    } else if ($(CLICKEDBTN).hasClass('run-random')) {
        var itemImg = Edamam.randItems[0].image;
        var itemName = Edamam.randItems[0].label;
        var itemDiet = Edamam.randItems[0].dietLabels;
    }

    // food item img
    var $itemImg = $('<img>');
    $itemImg.addClass("col-12 searched-item-img img-fluid rounded mx-auto d-block");
    $itemImg.attr("data-target", "#modelId");
    $itemImg.attr("data-toggle", "modal");
    if (itemImg) {
        $itemImg.attr('src', itemImg);
    } 
    // food item name
    var $itemName = $('<h5 class="col-12 searched-item-name">');
    if (itemName) {
        $itemImg.attr('name', itemName);
        $itemName.html(itemName.toUpperCase());
    }
    // food item DietLabel
    var $itemDiet = $('<div class="col-12">');
    var $itemDietI = $('<i class="searched-item-dietLabels">');
    $itemDiet.html($itemDietI);
    if (itemDiet) {
        $itemDietI.text(itemDiet);
    }
    // container for food img, name, diet label 
    var $itemCtnr = $('<div class="added-item row">');
    // append to container
    $itemCtnr.append($itemName);
    $itemCtnr.append($itemImg);
    $itemCtnr.append($itemDiet);

    // APPEND OBJECT TO MODAL BODY
    if ($(CLICKEDBTN).hasClass('run-search')) {
        $('.search-modal-area').html($itemCtnr);
    } else if ($(CLICKEDBTN).hasClass('run-random')) {
        $('.rand-modal-area').html($itemCtnr);
    }
}
