/*-----------------------footer------------------------*/

//service share
$share = $(".service").find("li").first();
$share.hover(
	function(){
		$(this).find(".share").show();
	},
	function() {
		$(this).find(".share").hide();
	}
);