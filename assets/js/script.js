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
	if ($(CLICKEDBTN).hasClass('run-search') && x === 0) {
		alert('Enter a food item!!!');

	} else {
		RunSearchAction();
		// IF LIKED ON SEARCH
		if ($(CLICKEDBTN).attr('id') === 'like') {
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

		// IF LIKED ON RAND
		} else if ($(CLICKEDBTN).attr('id') === 'rand-like') {
			var $likedName, $likedImg, $likedDiet, $likedHealth;

			// likedName
			$likedName = $('.rand-item-name').clone().removeClass();
			// likedImg
			$likedImg = $('.rand-item-img').clone().removeClass();
			$('.added-item').addClass('animated zoomOutRight');
			$likedImg.addClass('food-img');
			$likedImg.attr("data-target", "#modelId");
			$likedImg.attr("data-toggle", "modal");
			// likedDiet
			var $likedDiet = $('.rand-item-dietLabels').clone().removeClass();
			// likedHealth
			var $likedHealth = $('.rand-item-healthLabel').clone().removeClass();
	
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
	}
  
		/* $('.rand-item-caloriesLabel').text("Calories : " + Math.ceil(response.hits[0].recipe.calories));
		$('.rand-item-proteinsLabel').text("Proteins : " + Math.ceil(response.hits[0].recipe.totalNutrients.PROCNT.quantity) + " " + response.hits[0].recipe.totalNutrients.PROCNT.unit);
		$('.rand-item-carbsLabel').text("Carbohydrates : " + Math.ceil(response.hits[0].recipe.totalNutrients.CHOCDF.quantity) + " " + response.hits[0].recipe.totalNutrients.CHOCDF.unit);
		$('.rand-item-fatsLabel').text("Fats : " + Math.ceil(response.hits[0].recipe.totalNutrients.FAT.quantity) + " " + response.hits[0].recipe.totalNutrients.FAT.unit);
		$('.rand-item-choleLabel').text("Cholesterol : " + Math.ceil(response.hits[0].recipe.totalNutrients.CHOLE.quantity) + " " + response.hits[0].recipe.totalNutrients.CHOLE.unit); */
	});
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
        var itemHealth = Edamam.searchedItems[0].healthLabels;
        var $itemImg = $('<img class="col-12 searched-item-img img-fluid rounded mx-auto d-block">');
        var $itemName = $('<h5 class="col-12 searched-item-name">');
        var $itemDietI = $('<i class="searched-item-dietLabels">');
        var $itemHealthI = $('<i class="searched-item-healthLabels">');
    } else if ($(CLICKEDBTN).hasClass('run-random')) {
        var itemImg = Edamam.randItems[0].image;
        var itemName = Edamam.randItems[0].label;
        var itemDiet = Edamam.randItems[0].dietLabels;
        var itemHealth = Edamam.randItems[0].healthLabels;	
        var $itemImg = $('<img class="col-12 rand-item-img img-fluid rounded mx-auto d-block">');
        var $itemName = $('<h5 class="col-12 rand-item-name">');
        var $itemDietI = $('<i class="rand-item-dietLabels">');
        var $itemHealthI = $('<i class="rand-item-healthLabels">');
    }


	// item img
    $itemImg.attr("data-target", "#modelId");
    $itemImg.attr("data-toggle", "modal");
    if (itemImg) {
        $itemImg.attr('src', itemImg);
    } 
    // item name
    if (itemName) {
        $itemImg.attr('name', itemName);
        $itemName.html(itemName.toUpperCase());
    }
    // item DietLabel
    var $itemDiet = $('<div class="col-12">');
    $itemDiet.html($itemDietI);
    if (itemDiet) {
        $itemDietI.text(itemDiet);
	}
	
	// item HealthLabel
	var $itemHealth = $('<div class="col-12">');
	$itemHealth.html($itemHealthI);
	if (itemHealth) {
		$itemHealthI.text(itemHealth);
	}

    // container for food img, name, diet label 
    var $itemCtnr = $('<div class="added-item row">');
    // append to container
    $itemCtnr.append($itemName);
    $itemCtnr.append($itemImg);
    $itemCtnr.append($itemDiet);
    $itemCtnr.append($itemHealth);

    // APPEND OBJECT TO MODAL BODY
    if ($(CLICKEDBTN).hasClass('run-search')) {
        $('.search-modal-area').html($itemCtnr);
    } else if ($(CLICKEDBTN).hasClass('run-random')) {
        $('.rand-modal-area').html($itemCtnr);
    }
}
