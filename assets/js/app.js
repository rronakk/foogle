
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
/////
// RANDOM GIF IMAGE WITH KEYWORD ENDS ----------

/////
// COLLECT EDAMAM API DATA AND SAVE INTO edamam.items
/////
var edamam = {
    items: [],
    searchFrom: 0,
    searchCount: 3,
    buildQueryURL: function(keyword) {
        var queryURL = "https://api.edamam.com/search?";
        var queryParams = {};
        queryParams.app_id = '3ff2cec1';
        queryParams.app_key = '5daaa38e313d46e5ddf1d70317e69608';
        queryParams.q = keyword;
        queryParams.from = this.searchFrom;
        queryParams.to = this.searchFrom + this.searchCount;
        queryURL += $.param(queryParams);
        return queryURL;
    },
    collectData: function(Data) {
        for (var i = 0; i < this.searchCount; i++) {
            var newItem = {};
            newItem.label = Data.hits[i].recipe.label;
            newItem.image = Data.hits[i].recipe.image;
            newItem.dietLabels = Data.hits[i].recipe.dietLabels;
            newItem.calories = Data.hits[i].recipe.calories;
            newItem.ingredients = Data.hits[i].recipe.ingredients;
            edamam.items.push(newItem);  
        }
    }
};

$(document).ready(function () {
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


$(document).on("click", '.search-result-btn', function (event) {

    // SEARCH WITH KEYWORD AND SAVE THE DATA INTO edamam.items
    event.preventDefault();
    $.ajax({
        url: edamam.buildQueryURL($("#chosenCategory").val()),
        method: "GET"
    }).then( function(response) {
        edamam.collectData(response);
        console.log("----------")
        console.log(edamam.items);
    });

    // DISPLAY THE SEARCH RESULT IN HTML
    var $container = $('.result');
    var $itemContainer = $('<div>')
    var $itemName = $('<h5>');
    var $itemImg = $('<img>');
    $itemImg.addClass("img-fluid");

    for (var i = 0; i < edamam.searchCount; i++) {

        $itemName.text(edamam.items[i].label);
        $itemImg.attr('src', edamam.items[i].image);
        $itemContainer.append($itemName);
        $itemContainer.append($itemImg);

        console.log("**********");
        console.log($itemName);
        console.log($container);
        console.log(edamam.items[i]);
        console.log(edamam.items[i].label);
        console.log(edamam.items[i].image);
    }
    $container.prepend($itemContainer);

});


/////
// TEMPLATE FOR FOOD PHOTO API CALL
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




