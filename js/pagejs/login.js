require(["config"],function(){
	require(["jquery","url","errorMsg","jquery.swiper","jquery.cookie","jquery.validate"],function($,getUrl,err){
		$(function(){
			//轮播图
			new Swiper('.swiper-container',{
        		pagination: '.swiper-pagination',
		        paginationClickable: true,
		        effect: 'fade',
		        loop: true,
		        autoplay: 3000,
		        speed : 1000,
		        paginationBulletRender: function () {
     				return '<span class="swiper-pagination-bullet">' + "<i></i>" + '</span>';
  				}
			});
			
			/*----------------------判断注册还是登录-------------------*/
		
			if(getUrl.param("type")){
				$("#loginform").hide();
				$("#registerbox").show();
			}
			
			var check = {id:false,pwd:false,repwd:false};
			
			
			$("#id").blur(function(){
				var value = this.value;
				var $this = $(this);
				
				if(value == ""){
					err.show($this,$(".errormsg"),"请输入手机号码");
					check.id = false;
				}else if(/^1(3|4|5|7|8)\d{9}$/.test(value)){
					err.hide($this,$(".errormsg"));
					
					$.ajax({
						"type": "get",
						"url": "json/user.json",
						success: function(data){
							if(data.filter(function(item){
								return item.id == value;
							}).length){
								err.show($(this),$(".errormsg"),"该用户已经存在，请重新输入");
							}else{
								check.id = true;
							}
						}
					});
				}else{
					err.show($(this),$(".errormsg"),"格式不合法，请重新输入");
					check.id = false;
				}
			});
				
			
			/*----------------------注册验证之用户名验证-------------------*/
			
			$("#registerbox ul li").click(function(){
				
				err.hide($("input"),$(".errormsg"));
				
				if($(this).index()){
					//选择邮箱注册
					$(".telcheck").hide();
					$(this).removeClass("noregister").siblings().addClass("noregister");
					$("#id").prop("placeholder","请输入您的电子邮箱");
					
					$("#id").blur(function(){
						var value = this.value;
						var $this = $(this);
						
						if(value == ""){
							err.show($this,$(".errormsg"),"请输入您的电子邮箱");
							check.id = false;
						}else if(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value)){
							err.hide($this,$(".errormsg"));
							
							$.ajax({
								"type": "get",
								"url": "json/user.json",
								success: function(data){
									if(data.filter(function(item){
										return item.id == value;
									}).length){
										err.show($(this),$(".errormsg"),"该用户已经存在，请重新输入");
									}else{
										check.id = true;
									}
								}
							});
						}else{
							err.show($(this),$(".errormsg"),"格式不合法，请重新输入");
							check.id = false;
						}
					});
				}else{
					//选择手机注册
					$(this).removeClass("noregister").siblings().addClass("noregister");
					$("#id").prop("placeholder","请输入您注册的手机号码");
					$(".telcheck").show();
					$("#id").blur(function(){
						var value = this.value;
						var $this = $(this);
						
						if(value == ""){
							err.show($this,$(".errormsg"),"请输入手机号码");
							check.id = false;
						}else if(/^1(3|4|5|7|8)\d{9}$/.test(value)){
							err.hide($this,$(".errormsg"));
							
							$.ajax({
								"type": "get",
								"url": "json/user.json",
								success: function(data){
									if(data.filter(function(item){
										return item.id == value;
									}).length){
										err.show($(this),$(".errormsg"),"该用户已经存在，请重新输入");
									}else{
										check.id = true;
									}
								}
							});
						}else{
							err.show($(this),$(".errormsg"),"格式不合法，请重新输入");
							check.id = false;
						}
					});
				}
			});
			
			
			
			$("#registerPwd").blur(function(){
				var value = this.value;
				if(/^[a-z0-9_-]{6,20}$/.test(value)){
					err.hide($(this),$(".errormsg"));
					check.pwd = true;
				}else{
					check.pwd = false;
					err.show($(this),$(".errormsg"),"密码格式不合法，请重新输入");
				}
			});
			
			$("#repeatPwd").blur(function(){
				var value = this.value;
				var pwd = $("#registerPwd").prop("value");
				if(value == pwd){
					check.repwd = true;
					err.hide($(this),$(".errormsg"));
				}else{
					check.repwd = false;
					err.show($(this),$(".errormsg"),"密码输入不一致，请重新输入");
				}
			});
			
			
			$("#join").click(function(){
				if($("#accept").prop("checked")){
					var isRight = true;
					for(var i in check){
						if(!check[i]){isRight = false;break} 
					}
					if(isRight){
						var freshmen = {id:$("#id").prop("value"),pwd:$("#registerPwd").prop("value")};
						$.cookie("user",JSON.stringify(freshmen),{path:'/'});
						location.href = "index.html";
					}else{
						$(".errormsg").text("请完整填写注册信息").show();
					}
				}
				else{
					$(".errormsg").text("请同意用户相关条款").show();
				}
			});
			
			
			
			/*----------------------登陆验证之用户名验证-------------------*/
			var user = {id:"",pwd:""};
			var isId = false;
			var isPwd = false;
			$("#username").blur(function(){
				user.id = this.value;
				if(!user.id){
					$(".errormsg").text("请输入邮箱或手机号").show();
				}else{
					var $this = $(this);
					$.ajax({
						"type": "get",
						"url": "json/user.json",
						 success: function(data){
							if(data.filter(function(item){
								return item.id == user.id;
							}).length){
								err.hide($this,$(".errormsg"));
								isId = true;
							}
							else{
								err.show($this,$(".errormsg"),"账户不存在，请重新输入");
								isId = false;
							}
						 }
					});
					
				}
			});
			
			/*----------------------登陆验证之密码验证-------------------*/
			$("#pwd").blur(function(){
				user.pwd = this.value;
				if(!user.pwd){
					err.show($(this),$(".errormsg"),"请输入密码");
				}else{
					var $this = $(this);
					$.ajax({
						"type": "get",
						"url": "json/user.json",
						 success: function(data){
							if(data.filter(function(item){
								return (item.pwd == user.pwd && item.id == user.id);
							}).length){
								err.hide($this,$(".errormsg"));
								isPwd = true;
							}
							else{
								err.show($this,$(".errormsg"),"用户名或密码输入错误，请重新输入");
								isPwd = false;
							}
						 }
					});
				}
			});
			
			/*-----------------------------记住密码----------------------*/
			
			if($.cookie("user") != null && $.cookie("user")!="null"){
				var str = JSON.parse($.cookie("user"));
				console.log(str);
				user.id = str.id;
				user.pwd = str.pwd;
				$("#username").attr("value",user.id);
				$("#pwd").attr("value",user.pwd);
				isId = true;
				isPwd = true;
			}
						
			
			$("#loginBtn").click(function(){
				if(!isId){
					$(".errormsg").text("邮箱或手机号输入错误，请重新输入").show();
				}else if(!isPwd){
					$(".errormsg").text("密码输入错误，请重新输入").show();
				}else{
					if($("#remember").prop("checked")){
						$.cookie("user",JSON.stringify(user),{expires:7,path:'/'});
						setTimeout(function(){
							location.href = "index.html";
						},1000);
					}else{
						$.cookie("user",JSON.stringify(user),{path:'/'});
						setTimeout(function(){
							location.href = "index.html";
						},1000);
					}
				}
			});
				
			
		});
	});
});