define(["jquery"],function($){
	function ErrorMsg(){
		this.show = function(selector,msgbox,msg){
			selector.addClass("error");
			msgbox.text(msg).show();
		}
		this.hide = function(selector,msgbox){
			selector.removeClass("error");
			msgbox.hide();
		}
	}
	
	return new ErrorMsg();
})