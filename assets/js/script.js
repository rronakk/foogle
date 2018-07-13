///// INTRO PAGE
$(document).ready(function() {
	//pageAction
	IntroAction();
});

///// RANDOM MODAL
// DISPLAY RANDOM ITEMS ON MODAL (RANDOM MODAL)
$(document).on('click', '.run-random', function() {
	$('.rand-item').addClass('animated rotateOutDownLeft');
	RunSearchAction();
	event.preventDefault();

	$.ajax({
		url: Edamam.buildQueryURLRand(),
		method: 'GET',
	}).then(function(response) {
		console.log('randomURL: ' + Edamam.buildQueryURLRand());
		console.log(response);
		$('.rand-item').removeClass('rotateOutDownLeft');

		if (response.hits[0].recipe.label.toLowerCase().includes('recipe')) {
			$('.rand-item-name').html(response.hits[0].recipe.label.replace('recipe', ''));
		} else {
			$('.rand-item-name').html(response.hits[0].recipe.label);
		}
		$('.rand-item-img').attr('src', response.hits[0].recipe.image);
		$('.rand-item-caloriesLabel').text(Math.ceil(response.hits[0].recipe.calories));
		$('.rand-item-proteinsLabel').text(
			Math.ceil(response.hits[0].recipe.totalNutrients.PROCNT.quantity) +
				' ' +
				response.hits[0].recipe.totalNutrients.PROCNT.unit
		);
		$('.rand-item-carbsLabel').text(
			Math.ceil(response.hits[0].recipe.totalNutrients.CHOCDF.quantity) +
				' ' +
				response.hits[0].recipe.totalNutrients.CHOCDF.unit
		);
		$('.rand-item-fatsLabel').text(
			Math.ceil(response.hits[0].recipe.totalNutrients.FAT.quantity) +
				' ' +
				response.hits[0].recipe.totalNutrients.FAT.unit
		);
		$('.rand-item-choleLabel').text(
			Math.ceil(response.hits[0].recipe.totalNutrients.CHOLE.quantity) +
				' ' +
				response.hits[0].recipe.totalNutrients.CHOLE.unit
		);
	});
});

// CLICKING ON LIKE BTN (RANDOM MODAL)
$(document).on('click', '#rand-like', function(event) {
	$('.rand-item').addClass('animated zoomOutRight');
	var $likedName = $('.rand-item-name')
		.clone()
		.removeClass();
	var $likedImg = $('.rand-item-img')
		.clone()
		.removeClass();
	$likedImg.attr('name', $likedName.text());
	$likedImg.addClass('food-img img-fluid img-thumbnail mx-auto d-block');
	$likedImg.attr('data-target', '#modelId');
	$likedImg.attr('data-toggle', 'modal');
	var $likedCalories = $('.rand-item-caloriesLabel')
		.clone()
		.removeClass();
	var $likedProteins = $('.rand-item-proteinsLabel')
		.clone()
		.removeClass();
	var $likedCarbs = $('.rand-item-carbsLabel')
		.clone()
		.removeClass();
	var $likedFats = $('.rand-item-fatsLabel')
		.clone()
		.removeClass();
	var $likedChole = $('.rand-item-choleLabel')
		.clone()
		.removeClass();

	var $likedItem = $('<div class="liked-item col-lg-4 card favsFood">');
	$likedItem.append($likedName);
	$likedItem.append($likedImg);
	$likedCalories.prepend('Calories : ');
	$likedItem.append($likedCalories);
	$likedProteins.prepend('Proteins : ');
	$likedItem.append($likedProteins);
	$likedCarbs.prepend('Carbohydrates : ');
	$likedItem.append($likedCarbs);
	$likedFats.prepend('Fats : ');
	$likedItem.append($likedFats);
	$likedChole.prepend('Cholesterol : ');
	$likedItem.append($likedChole);
	$('.result-item-area').prepend($likedItem);
	event.preventDefault();

	$.ajax({
		url: Edamam.buildQueryURLRand(),
		method: 'GET',
	}).then(function(response) {
		console.log(response);
		console.log('randomURL: ' + Edamam.buildQueryURLRand());

		$('.rand-item').removeClass('zoomOutRight');
		if (response.hits[0].recipe.label.toLowerCase().includes('recipe')) {
			$('.rand-item-name').html(response.hits[0].recipe.label.replace('recipe', ''));
		} else {
			$('.rand-item-name').html(response.hits[0].recipe.label);
		}
		$('.rand-item-img').attr('src', response.hits[0].recipe.image);
		$('.rand-item-caloriesLabel').text(Math.ceil(response.hits[0].recipe.calories));
		$('.rand-item-proteinsLabel').text(
			Math.ceil(response.hits[0].recipe.totalNutrients.PROCNT.quantity) +
				' ' +
				response.hits[0].recipe.totalNutrients.PROCNT.unit
		);
		$('.rand-item-carbsLabel').text(
			Math.ceil(response.hits[0].recipe.totalNutrients.CHOCDF.quantity) +
				' ' +
				response.hits[0].recipe.totalNutrients.CHOCDF.unit
		);
		$('.rand-item-fatsLabel').text(
			Math.ceil(response.hits[0].recipe.totalNutrients.FAT.quantity) +
				' ' +
				response.hits[0].recipe.totalNutrients.FAT.unit
		);
		$('.rand-item-choleLabel').text(
			Math.ceil(response.hits[0].recipe.totalNutrients.CHOLE.quantity) +
				' ' +
				response.hits[0].recipe.totalNutrients.CHOLE.unit
		);
	});
});

// DISPLAY SEARCHED ITEMS ON MODAL
$(document).on('click', '.run-search', function(event) {
	let x = $('#searchItem').val().length;
	if (x === 0) {
		
		//alert("Enter a search term");
	} else {
		$('.search-item').addClass('animated rotateOutDownLeft');
		//pageAction
		RunSearchAction();

		event.preventDefault();
		var search = $('#searchItem')
			.val()
			.trim();
		console.log(Edamam.buildQueryURLSearch(search));

		//!!! temp action for adding item to modal and to page
		// ADDING TO SEARCH MODAL
		$.ajax({
			url: Edamam.buildQueryURLSearch(search),
			method: 'GET',
		}).then(function(response) {
			console.log(response);
			console.log('searchedURL: ' + Edamam.buildQueryURLSearch(search));
			$('.search-item').removeClass('rotateOutDownLeft');

			if (response.hits[0].recipe.label.toLowerCase().includes('recipe')) {
				$('.searched-item-name').html(response.hits[0].recipe.label.replace('recipe', ''));
			} else {
				$('.searched-item-name').html(response.hits[0].recipe.label);
			}
			$('.searched-item-img').attr('src', response.hits[0].recipe.image);
			$('.searched-item-caloriesLabel').text(Math.ceil(response.hits[0].recipe.calories));
			$('.searched-item-proteinsLabel').text(
				Math.ceil(response.hits[0].recipe.totalNutrients.PROCNT.quantity) +
					' ' +
					response.hits[0].recipe.totalNutrients.PROCNT.unit
			);
			$('.searched-item-carbsLabel').text(
				Math.ceil(response.hits[0].recipe.totalNutrients.CHOCDF.quantity) +
					' ' +
					response.hits[0].recipe.totalNutrients.CHOCDF.unit
			);
			$('.searched-item-fatsLabel').text(
				Math.ceil(response.hits[0].recipe.totalNutrients.FAT.quantity) +
					' ' +
					response.hits[0].recipe.totalNutrients.FAT.unit
			);
			$('.searched-item-choleLabel').text(
				Math.ceil(response.hits[0].recipe.totalNutrients.CHOLE.quantity) +
					' ' +
					response.hits[0].recipe.totalNutrients.CHOLE.unit
			);
			addItemToBody();
		});
		// LIKING ITEMS //!!! cannot get the key id inside of AJAX... will go non-dry for now   search for "fa-thumbs-up" on html
		var addItemToBody = function() {
			if (
				$(this)
					.bind(this.document)
					.attr('id') === 'like'
			) {
				$('.result-item-area').prepend($('.search-item').clone());
			}
		};
	}
});

// ---------------------------------------------------- remove after make it dry with .run-search
$(document).on('click', '#like', function(event) {
	$('.search-item').addClass('animated zoomOutRight');
	var $likedName = $('.searched-item-name')
		.clone()
		.removeClass();
	var $likedImg = $('.searched-item-img')
		.clone()
		.removeClass();
	$likedImg.attr('name', $likedName.text());
	$likedImg.addClass('food-img img-fluid img-thumbnail mx-auto d-block');
	$likedImg.attr('data-target', '#modelId');
	$likedImg.attr('data-toggle', 'modal');
	var $likedCalories = $('.searched-item-caloriesLabel')
		.clone()
		.removeClass();
	var $likedProteins = $('.searched-item-proteinsLabel')
		.clone()
		.removeClass();
	var $likedCarbs = $('.searched-item-carbsLabel')
		.clone()
		.removeClass();
	var $likedFats = $('.searched-item-fatsLabel')
		.clone()
		.removeClass();
	var $likedChole = $('.searched-item-choleLabel')
		.clone()
		.removeClass();

	var $likedItem = $('<div class="liked-item col-lg-4 card favsFood">');
	$likedItem.append($likedName);
	$likedItem.append($likedImg);
	$likedCalories.prepend('Calories : ');
	$likedItem.append($likedCalories);
	$likedProteins.prepend('Proteins : ');
	$likedItem.append($likedProteins);
	$likedCarbs.prepend('Carbohydrates : ');
	$likedItem.append($likedCarbs);
	$likedFats.prepend('Fats : ');
	$likedItem.append($likedFats);
	$likedChole.prepend('Cholesterol : ');
	$likedItem.append($likedChole);
	$('.result-item-area').prepend($likedItem);
	event.preventDefault();
	var search = $('#searchItem')
		.val()
		.trim();
	console.log(Edamam.buildQueryURLSearch(search));

	$.ajax({
		url: Edamam.buildQueryURLSearch(search),
		method: 'GET',
	}).then(function(response) {
		console.log('searchedURL: ' + Edamam.buildQueryURLSearch(search));
		console.log(response);
		$('.search-item').removeClass('zoomOutRight');
		if (response.hits[0].recipe.label.toLowerCase().includes('recipe')) {
			$('.searched-item-name').html(response.hits[0].recipe.label.replace('recipe', ''));
		} else {
			$('.searched-item-name').html(response.hits[0].recipe.label);
		}
		$('.searched-item-img').attr('src', response.hits[0].recipe.image);
		/* $('.rand-item-caloriesLabel').text("Calories : " + Math.ceil(response.hits[0].recipe.calories));
		$('.rand-item-proteinsLabel').text("Proteins : " + Math.ceil(response.hits[0].recipe.totalNutrients.PROCNT.quantity) + " " + response.hits[0].recipe.totalNutrients.PROCNT.unit);
		$('.rand-item-carbsLabel').text("Carbohydrates : " + Math.ceil(response.hits[0].recipe.totalNutrients.CHOCDF.quantity) + " " + response.hits[0].recipe.totalNutrients.CHOCDF.unit);
		$('.rand-item-fatsLabel').text("Fats : " + Math.ceil(response.hits[0].recipe.totalNutrients.FAT.quantity) + " " + response.hits[0].recipe.totalNutrients.FAT.unit);
		$('.rand-item-choleLabel').text("Cholesterol : " + Math.ceil(response.hits[0].recipe.totalNutrients.CHOLE.quantity) + " " + response.hits[0].recipe.totalNutrients.CHOLE.unit); */
	});
});
// ---------------------------------------------------- remove after make it dry with .run-search

var displaySearchedItems = function() {
	// food item img
	var $itemImg = $('<img>');
	var itemImg = Edamam.searchedItems[0].image;
	$itemImg.attr('data-target', '#modelId');
	$itemImg.attr('data-toggle', 'modal');
	$itemImg.addClass('food-img img-fluid img-thumbnail mx-auto d-block');
	if (itemImg) {
		$itemImg.attr('src', itemImg);
	}

	// food item name
	var $itemName = $('<h5 class="text-center">');
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
	$foodCtnr.addClass('food-ctnr card');
	// append to container
	$foodCtnr.append($itemImg);
	$foodCtnr.append($itemName);
	// append to body
	$('.result-item-area').append($foodCtnr);
};

// DETAIL SEARCH TOGGLE ON/OFF
$(document).on('click', '#detail-search', function() {
	$('.detail-search-form').toggle();
});
