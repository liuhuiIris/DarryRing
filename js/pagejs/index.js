require(["config"],function(){
	require(["jquery","jquery.swiper"],function($){
		$(function () {
			 var swiper = new Swiper('.swiper-container', {
        		pagination: '.swiper-pagination',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        effect: 'fade',
		        loop: true,
		        autoplay: 3000,
		        speed : 1000,
		        autoplayDisableOnInteraction:false,
		        paginationBulletRender: function () {
      return '<span class="swiper-pagination-bullet">' + "<i></i>" + '</span>';
  				}
		    });
		    
		    $(".swiper-container").hover(
		    	function(){
				    $(".swiper-button-next,.swiper-button-prev").show();
		    	},
		    	function(){
		    		$(".swiper-button-next,.swiper-button-prev").hide();
		    	}
		    );
		    
					
		});
	});
});