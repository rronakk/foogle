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
  

  var searchButton = document.getElementsByClassName('run-search')[0];
  var searchInput = document.getElementById('searchItem');
  searchInput.addEventListener("keyup",function(){
    if(searchInput.value.length === 0){
        searchButton.disabled = true;
    }
    else {  

      searchButton.disabled = false;

      }
    });
  

});

