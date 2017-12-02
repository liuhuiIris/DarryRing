/*-----------------------sub_nav------------------------*/

$(window).scroll(function(){
	var _top = $(window).scrollTop();
	if(_top > 200){
		$(".sub_nav").show();	
	}else{
		$(".sub_nav").hide();
	}
});

$(".quick_sort").hover(
	function(){
		$(this).addClass("hover");
		$(this).children().first().addClass("hover");
		$(this).children().last().animate({
			right:50,
			opacity : "show"
		},500);
	},
	function() {
		$(this).removeClass("hover");
		$(this).children().first().removeClass("hover");
		$(this).children().last().hide().css("right",0);
	}
);

/*-------------------topTop-------------------------------*/
$(".toTop a").click(function(){
	//兼容火狐的写法
	$("body,html").animate({scrollTop : 0},500);
});
