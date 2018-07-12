var IntroAction = function () {
    $('.result').hide();
    $('.intro_2').hide();
    setTimeout( function () {
        $('.intro_1').fadeOut(500);
        $('.intro_2').fadeIn(500);
    }, 500);
    $('.searched-result-page').hide();
    $('.random-result-page').hide();
    $('.fav-result-page').hide();
    $('.page-navigation').hide()
    $('.page-tab').hide();
    $('.michael-eg').hide();
}

var RunSearchAction = function () {
    $('.result').show();
    $(".g-home").hide();
    // $('.searched-result-page').prepend('<h1 class="col-12">Here is our recommendation on: ' + $('#searchItem').val().trim().toUpperCase() + '</h1>');
    $('.searched-result-page').prepend($('#search-area'));
    $('.searched-result-page').fadeIn(2000);
    $('.page-navigation').fadeIn(2000);
    $('.page-tab').fadeIn(4000);
}

$("#homeTab").on("click", function(){
    $(".g-home").show();
    $('#ghome').append($("#search-area"));
    $('.searched-result-page').hide();

});

$("#favTab").on("click", function(){
    if ($('.result-item-area').is(':empty')){
        alert("You have not yet added your favorite foods!!");
        location.reload();
      }
    else{
        $('.searched-result-page').show();
        $('.result').show();
        $(".g-home").hide();
        $('.searched-result-page').prepend($('#search-area'));
    }
});
