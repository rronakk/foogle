

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
// GIPHY API CALL FOR FOOD DATING
/////
$(document).ready(function () {
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
/////
// GIPHY API CALL FOR FOOD DATING ENDS ----------


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
        giphy.updateGifContainer(response)
        $('#food-item-slide').append(giphy.$gifContainer);
    });
});
/////
// TEMPLATE FOR FOOD PHOTO API CALL ENDS ----------



