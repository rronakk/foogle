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

  // $('#favTab').on('click',()=>{
  //   if ($('.result-item-area').is(':empty')){
  //     alert("You have not yet added your favorite foods!!");
  //     location.reload();
  //   }
  // });

});

