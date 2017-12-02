require(["config"],function(){
	require(["jquery","url","GetData","jquery.cookie"],function($,getUrl,getdata){
		
		var diamondId = getUrl.param("goodid");
		
		getdata.getDataById("json/goods.json","dimond_id",diamondId,function(item){
			$sImg.find("img").prop("src",item.src);
			$bImg.prop("src",item.src);
	
			/*---------------------浏览记录----------------------------*/
			var brhistory = $.cookie("history");
			var arr = [];
			if(brhistory){
				arr = brhistory.split(",");	
				var isIn = false;
				for(var i in arr){
					if(arr[i] == item.dimond_id){
						isIn = true;
						break;
					}
				}
				if(!isIn){
					//如果浏览历史超过10条记录，则删除第一条记录，再添加记录
					if(arr.length>10)	arr.shift();
					arr.push(item.dimond_id);
					isIn = false;	
				}
			}else{
				arr.push(item.dimond_id);
			}
			$.cookie("history", arr.join(),{path:"/",expires:7});
			
			for(var i in arr){
				getdata.getDataById("json/goods.json","dimond_id",arr[i],function(it){
					$(".history .history_list").prepend("<dl><dt>"
					+"<a href='detail.html?goodid="+ it.dimond_id +"'>"
					+"<img src='"+ it.src +"'/></a></dt>"
					+"<dd><a href='detail.html?goodid='"+ it.dimond_id +">"
					+it.series+" "+it.style+" "+ it.match +" </a></dd>"
					+"<dd>￥"+ it.price +"</dd></dl>");
				})
			}
		});


		$sImg = $(".sImg");
		
		/*------------------添加购物车,没来得及提取参数封装-----------------*/
		$("#joincar").click(function(){
			var car = new JoinCar().init().start();
			var carlist = $.cookie("shoppingcar")?$.cookie("shoppingcar").split(","):[];
			if(carlist.length){
				var isIn = false;
				for(var i in carlist){
					if(carlist[i] == diamondId){
						isIn = true;
						break;
					}
				}
				if(!isIn){
					carlist.push(diamondId);
				}
			}else{
				carlist.push(diamondId);
			}
			$.cookie("shoppingcar", carlist.join(),{expires:7,path:"/"});
		});
		
		function JoinCar(){
			this.body = document.createElement("div");
			this.init = function(){
				$(this.body).css({
					"width":this.startWidth(),
					"height":this.startHeight(),
					"border":"1px solid #ccc",
					"position":"absolute","z-index":"9",
					"left":this.startLeft()});
				$(this.body).appendTo(".detail .content");
				return this;
			}

			this.startLeft = function(){
				return $(".nowpic").position().left + 30;
			}
			this.startWidth = function(){
				return "400px";
			}
			this.startHeight = function(){
				return "400px";
			}
			
			this.endLeft = function(){
				return $("#joincar").position().left;
			}
			this.endTop = function(){
				return $("#joincar").position().top;
			}
			this.endWidth = function(){
				return $("#joincar").outerWidth();
			}
			this.endHeight = function(){
				return $("#joincar").outerHeight();
			}
			this.start = function(){
				$this = $(this.body)
				$(this.body).animate({
					left : this.endLeft(),
					top : this.endTop(),
					width : this.endWidth(),
					height : this.endHeight()
				},1000,function(){
					$this.hide();
				});
			}
		}

		
		
		/*------------------------放大镜效果---------------------------*/
		
		$bImg = $(".bigImg");
		$sCursor = $(".cursor");
		$bCursor = $(".bigpic");		
		
		//小放大镜的大小/小图片的大小 = 大放大镜的大小/大图片的大小 
		var _width = $sImg.width() * $bCursor.width() / $bImg.width();
		var _height = $sImg.height() * $bCursor.height() / $bImg.height();
				
		var scale = $bImg.width()/$sImg.width();
		
		$sImg.hover(
			function(){
				$sCursor.width(_width);
				$sCursor.height(_height);
				$bCursor.show();
				$sCursor.show();
			},
			function(){
				$bCursor.hide();
				$sCursor.hide();
			}
		);
		$sImg.mousemove(function(e){
			//鼠标相对于小图片内部的位置
			var dx = e.pageX - $sImg.offset().left;
			var dy = e.pageY - $sImg.offset().top;
			
			$sCursor.css({
				left:Math.min($sImg.width()-_width,Math.max(0,dx-_width/2)),
				top:Math.min($sImg.height()-_height,Math.max(0,dy-_height/2))
			});

			$bImg.css({
				left : -$sCursor.position().left*scale,
				top : -$sCursor.position().top*scale
			});
			
		});
		
		/*-----------------------商品附图切换--------------------------*/
		$(".productList ul li").click(function(e){
			$(this).addClass("currentPic").siblings().removeClass("currentPic");
			var src = $(this).find("img").prop("src");
			$sImg.find("img").prop("src",src);
			$bImg.prop("src",src);
		});
		
		/*--------------------钻石搭配选择----------------------------------*/
		$(".match li").click(function(){
			$(this).addClass("chose").siblings().removeClass("chose");
		});
		
				
		/*---------------------tab切换效果----------------------------*/
		$(".msgList li").click(function(){
			$(this).addClass("curTab").siblings().removeClass("curTab");
			$(".tab_content").hide().eq($(this).index()).show();
			
			function Comment(){
				this.getList = function(page){
					$.ajax({
						url:"http://comment.secoo.com/comment/comment.jsp?process=7&pageSize=8&isImg=0&productId=11077616&productBrandId=24&productCategoryId=185",
						async:true,
						dataType:"jsonp",
						jsonp : "callback",
						data : {currPage:(page?page:1)},
						success : function(data){
							var list = data.data.productCommentList;
							for(var i in list){
								var createdate = new Date(list[i].createDate);
								$(".tab2").append("<div class='commentlist'>"
								+"<p class='left'>"+ list[i].content +"</p>"
								+"<p class='right'><span>"+list[i].userName +"</span><span>"+
								+ createdate.getFullYear()+"/"+createdate.getMonth()+"/"+createdate.getDate()
								+"</span></p>"
								+"</div>");
							}
						}
					});
				}
			}
			
			switch ($(this).index()){
				case 1:{
					new Comment().getList();
					break;
				}
				case 3:{break;}
			}
		});
		
		
		/*------------------------导航栏----------------------------------*/
		var msgTop = $(".msgList").position().top
		window.onscroll = function(){
			var _top = document.documentElement.scrollTop || document.body.scrollTop;
			if(_top>msgTop){
				$(".msgList").css({"top":0,"position":"fixed","background":"#fff"});
			}else{
				$(".msgList").css({"position":"static","background":""});
			}
		}
		
		
	});
});
