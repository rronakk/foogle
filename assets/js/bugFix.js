$(document).ready(function() {
	$("form").validate({
    rules : {
      fooglesearch: {
        required: true
      }
    }
    
  });

  $('.searched-item-img').addClass("img-fluid rounded mx-auto d-block");
  $('.rand-item-img').addClass("img-fluid rounded mx-auto d-block");

});

