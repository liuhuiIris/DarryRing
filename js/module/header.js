/*---------------------检查登录状态---------------------*/
function checklogin(){
	if($.cookie("user")!= null && $.cookie("user")!="null"){
		$(".nologin").hide();
		$(".islogin").show();
		var user_cookie = JSON.parse($.cookie("user"));
		$(".sayhiname").text(user_cookie.id);
//				$.ajax({
//					type:"get",
//					url:"json/user.json",
//					async:true,
//					success : function(data){
//						var userlist = data.filter(function(item){
//							return item.id == user_cookie.id;
//						});
//						$(".nologin").hide();
//						$(".islogin").show();
//						if(userlist){
//							$(".sayhiname").text(userlist[0].name);
//						}else{
//							$(".sayhiname").text(user_cookie.id);
//						}
//					}
//				});
	}else{
		$(".nologin").show();
		$(".islogin").hide();
	}
}

checklogin();


/*----------------判断是否免登陆----------------------*/
$(window).focus(function(){
	checklogin();
});


/*----------------设置注册参数----------------------*/
$(".register").click(function(){
	window.location.href ="login.html?type=1";
});

/*----------------退出登陆操作，清除cookie----------------------*/
$(".quit").click(function(){
	$.cookie("user",null);
	$(".islogin").hide();
	$(".nologin").show();
});


/*-----------------------header------------------------*/
//扫码效果
$app = $(".app");
$app.hover(
	function(){
		$(this).find("span").addClass("hover");
		$(this).find("dl").show();
	},
	function(){
		$(this).find("span").removeClass("hover");
		$(this).find("dl").hide();
	}
);

//语言选择
$language = $(".language");
$language.hover(
	function(){
		$(this).find("li").show();
	},
	function(){
		$(this).find("li").hide();
		$(this).find(".lang1").show();
	}
);

//实体店选择
$stores = $(".stores");
$stores.hover(
	function(){
		$(this).find(".storeAll").addClass("hover");
		$(this).find(".location").show();
	},
	function(){
		$(this).find(".storeAll").removeClass("hover");
		$(this).find(".location").hide();
	}
);

//查询提示
$showMsg= $(".header_down");
$showMsg.hover(
	function(){
		$(this).find(".check_msg").show();
		setTimeout(function(){
			$showMsg.find(".check_msg").hide();
		},2000);
	},
	function(){
		$(this).find(".check_msg").hide();
	}
);

//号码地区
$currArea = $("#currArea");
$areaList = $("#areaList");
$idCard = $("#idCard");

$currArea.click(function(e){
	e = e || event;
	e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
	$areaList.show();
});

$areaList.find("li").click(function(e){
	e = e || event;
	e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
	$currArea.text($(this).text());
	switch ($(this).text()){
		case "中国大陆": $idCard.prop("placeholder","请输入身份证号验证真爱承诺"); break;
		case "海外地区": $idCard.prop("placeholder","請輸入護照編號驗證真愛承諾"); break;
		case "港澳台": $idCard.prop("placeholder","請輸入港澳台身份證號碼驗證"); break;
		case "其他": $idCard.prop("placeholder","请输入国家证件号码验证真爱承诺"); break;
	}
	$areaList.hide();
});

$("body").click(function(){
	$areaList.hide();
});

var _placeholder = null;
$idCard.focus(function(){
	_placeholder = $(this).prop("placeholder");
	$(this).prop("placeholder","");
});

$idCard.blur(function(){
	if($(this).text()){
		$(this).prop("value",$(this).text());
	}else{
		$(this).prop("placeholder",_placeholder);
	}
});