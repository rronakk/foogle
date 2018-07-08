/////global variables
let id = ['ce21ee88', '520c98f5', '3ff2cec1'];
let KEY = ['6acf93ffdefda4479aa332299d1492c4', 'c62e2a4f261a2553730816962b096921', '5daaa38e313d46e5ddf1d70317e69608'];
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
//first image on modal and random images
$(document).on('click', '#firstImg', () => {
	AJAX(2);
});
/////like image
$(document).on('click', '#like', () => {
	AJAX(1);
});
/////dislike image
$(document).on('click', '#dislike', () => {
	AJAX(2);
});

/// generic ajax call
const AJAX = (n) => {
	let edamamURL = edamam.buildQueryURLSearch(options[randFunc(options.length) - 1]);
	$.ajax({
		url: edamamURL,
		method: 'GET',
	}).then(function(response) {
		let num = randFunc(10);
		let imgName = response.hits[num].recipe.label;
		let name = $('<h4>').append(imgName);
		let img = $('<img>').attr('src', response.hits[num].recipe.image);
		$(img).addClass('img-thumbnail');
		if(n===2) {
			$('.modalImg').html(img);
			$('.imgName').html(name);
		}
		if(n===1) $('.addImage').append(img);

	});
};
///// edamam info
var edamam = {
	proxyURL: 'https://shielded-hamlet-43668.herokuapp.com/',
	URL: 'https://api.edamam.com/search?q=',
	app_id: id[0],
	app_key: KEY[0],
	buildQueryURLSearch: function(keyword) {
		var queryURL = this.proxyURL + this.URL + keyword + '&app_id=' + this.app_id + '&app_key=' + this.app_key + '&';
		return queryURL;
	},
};
