$(document).ready(function() {
	// $("form").validate({
  //   rules : {
  //     fooglesearch: {
  //       required: false
  //     }
  //   }
    
  // });
  //add class to the image
  $('.searched-item-img').addClass("img-fluid rounded mx-auto d-block");
  $('.rand-item-img').addClass("img-fluid rounded mx-auto d-block");
  
  //this is for the favrite icon if it is empty
  $('#favTab').on('click',()=>{
    if($('#searchItem').val().length === 0)
    {
      $('.clk').click();
    }
  })


});

