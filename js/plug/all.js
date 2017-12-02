
require(["config"],function(){
	require(["jquery","jquery.ui","jquery.cookie"],function($){
		$(function(){
			
			/*---------------------导入header模版------------------------*/
			$(".header").load("html_modules/header.html",function(){
				$.getScript("js/module/header.js");
			});
			
			/*---------------------导入nav模版----------------------------*/
			$(".nav").load("html_modules/nav.html",function(){
				$.getScript("js/module/nav.js");
			});
			
			/*---------------------导入sub_nav模版----------------------------*/
			$(".sub_nav").load("html_modules/sub_nav.html",function(){
				$.getScript("js/module/sub_nav.js");
			});
			
			/*---------------------导入promise模版------------------------*/
			$(".promise").load("html_modules/promise.html");
			
			/*---------------------导入service模版------------------------*/
			$(".service").load("html_modules/service.html");
			
			/*---------------------导入footer模版------------------------*/
			$(".footer").load("html_modules/footer.html",function(){
				$.getScript("js/module/footer.js");
			});
			
			/*-----------------------search，搜索框------------------------*/
			$("#searchkey").autocomplete({
				source: function(request,response){
					window.getsearchKey = function(data){
						response(data.s);
					}
					
					var _script = document.createElement("script");
					_script.src = "http://suggestion.baidu.com/su?wd="+request.term+"&cb=getsearchKey";
					document.body.appendChild(_script);
				}
			});

		});
	
	});
	
});