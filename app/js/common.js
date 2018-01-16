$(function() {
  $.ajax({
	type: "get",
	dataType: "json",
	beforeSend: function () {
		$('.cssload-container').show();
	},
    url: "http://504080.com/api/v1/services/categories",
    headers: {
		"Content-Type": "application/json",
    "Authorization": "94f1b3148f0576d5c4f59e7fd85dafea218df50d"
    },
    dataType: "json",
    success: success,
    error: function(jqXHR) {
		if (jqXHR.status === 0) {
			$('.container-service').hide();
			$('.error-modal').toggle();
			$('.error-modal_qwserver').html('Not connect.\n Verify Network.')
		} else if (jqXHR.status == 404) {
			$('.container-service').hide();
			$('.error-modal').toggle();
			$('.error-modal_qwserver').html('Requested page not found. [404]')
		} else if (jqXHR.status == 500) {
			$('.container-service').hide();
			$('.error-modal').toggle();
			$('.error-modal_qwserver').html('Internal Server Error [500].')
		} else {
			$('.container-service').hide();
			$('.error-modal').toggle();
			$('.error-modal_qwserver').html('error')
		}
	}
  });
  function success(data) {
	$('.cssload-container').hide();
	var categoryCard = '';
    for( i=0; i<= data.data.length; i++) {
		categoryCard = `<div class="category-card"><img class="category-card_img" src="http:${data.data[i].icon}" alt="img-category"><p class="category-card_title">${data.data[i].title}</p><div>`
		$(categoryCard).appendTo($('.container-service'))
	}
  }
  $('.error-modal_btn').on('click', function(){
	  $('.error-modal').toggle();
	  location.reload();
		})
});

