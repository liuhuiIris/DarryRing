/*-----------------------nav------------------------*/
$nav = $(".nav_list");
$nav.children().hover(
	function(){
		$(this).find(".dr_subnav").show();
	},
	function(){
		$(this).find(".dr_subnav").hide();
	}
);
