$(document).ready(() => {
	/////global variables
	let id = ['ce21ee88', '520c98f5', '3ff2cec1'];
	let KEY = [
		'6acf93ffdefda4479aa332299d1492c4',
		'c62e2a4f261a2553730816962b096921',
		'5daaa38e313d46e5ddf1d70317e69608',
	];
	////array for food options
	options = [
		'meat',
		'tofu',
		'vegeterian meat',
		'oxtail stew',
		'fish',
		'bacon',
		'rice',
		'beans',
		'bread',
		'crocodile',
		'eggs',
		'goat',
		'vegetables',
		'cow',
		'turkeys',
		'ducks',
		'geese',
		'gyro',
	];
	////// to generate random number from 1 to n
	const randFunc = n => {
		return Math.floor(Math.random() * n + 1);
	};
	//first image on modal and dislike images
	$(document).on('click','.first_Dislike', () => {
		let edamamURL = edamam.buildQueryURLSearch(options[randFunc(options.length) - 1]);
		$.ajax({
			url: edamamURL,
			method: 'GET',
		}).then(function(response) {
			let num = randFunc(10);
			let imgName = response.hits[num].recipe.label;
			let url = response.hits[num].recipe.image;
			let name = $('<h4>').append(imgName);
			let img = $('<img>').attr('src', url);
			$(img).addClass('img-thumbnail');
			//liked first image
			$('#like').on('click',()=>{
				$('.addImage').append(img);
				$('.addImage').append(name);
			})
			$('.modalImg').html(img);
			$('.imgName').html(name);
		});
	});
	// i like image
	$('#like').on('click', () => {
		let edamamURL = edamam.buildQueryURLSearch(options[randFunc(options.length) - 1]);
		$.ajax({
			url: edamamURL,
			method: 'GET',
		}).then(function(response) {
			let num = randFunc(10);
			let imgName = response.hits[num].recipe.label;
			let url = response.hits[num].recipe.image;
			let name = $('<h4>').append(imgName);
			let img = $('<img>').attr('src', url);
			$(img).addClass('img-thumbnail');
			$('.addImage').append(img);
			$('.addImage').append(name);
			$('.modalImg').html(img);
			$('.imgName').html(name);
		});
	});

	///// edamam info
	var edamam = {
		proxyURL: 'https://shielded-hamlet-43668.herokuapp.com/',
		URL: 'https://api.edamam.com/search?q=',
		app_id: id[2],
		app_key: KEY[2],
		buildQueryURLSearch: function(keyword) {
			var queryURL =
				this.proxyURL + this.URL + keyword + '&app_id=' + this.app_id + '&app_key=' + this.app_key + '&';
			return queryURL;
		},
	};
});
