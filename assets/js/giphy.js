/////
// RANDOM GIF IMAGE WITH KEYWORD
/////
var Giphy = {
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
        var $FoodResultNote = $('<btn class="random-result-btn" data-dismiss="modal"><h1>Click to Show My Result</h1></btn>');
        this.$gifContainer.append($FoodResultNote);
    }
}
