/////
// EDAMAM API SEARCH WITH KEYWORD
/////
var Edamam = {
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
        queryParams.from = Math.floor(Math.random() * 100); //!!! temporarily setting it up for 100.  it should be the count - 10.
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