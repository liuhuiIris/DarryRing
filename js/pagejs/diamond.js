require(["config"],function(){
	require(["jquery","jquery.ui","jquery.cookie"],function($){
		$(function(){
			
			function Showpage(list,parent,per){
				this.perPage = per || 12;
				this.total = list.length;
				this.body = parent;
				this.init = function(){
					this.currPage = 1;
					this.odd = this.total%this.perPage;
					this.pageNum = Math.ceil(this.total/this.perPage);
					return this;
				}
				this.showNextPage = function(){
					this.currPage = this.getNextPgeNum();
					this.show();
				}
				this.showPrePage = function(){
					this.currPage = this.getPrePageNum();
					this.show();
				}
				
				this.getCurNum = function(){
					return (this.currPage-1)*this.perPage;
				}
				this.getCurCount = function(){
					return (this.currPage==this.pageNum ? this.odd : this.perPage);
				}
				this.getPrePageNum = function(){
					return (this.currPage==1 ? this.currPage : this.currPage-1);
				}
				this.getNextPgeNum = function(){
					return (this.currPage==this.pageNum ? this.currPage : this.currPage+1);
				}
				
				this.show = function(){
					$(this.body).html("");
					for(var i=this.getCurNum(); i<this.getCurNum()+this.getCurCount(); i++){
						var _right = "";
						if((i+1)%3 == 0) _right = "class='right'"; 
						$(this.body).append("<li "+_right+"><dl><dt>"
						+"<a href='detail.html?goodid="+list[i].dimond_id+"'><img src='"
						+list[i].src+"'/></a></dt><dd class='price'>￥"
						+ list[i].price +"</dd>"
						+"<dd class='type'><span>"
						+list[i].series+"</span> <span>" 
						+list[i].style + " </span><span>"
						+list[i].match +"</span></dd>"
						+"<dd><a href='###' class='collect'>收藏</a><a href='###' class='buynow'>立即购买</a></dd>"
						+"<dd>已售:<span class='sell'>26792</span>评价: <span class='comment'>2710</span></dd></dl></li>");
					}
				}	
			}
			
			$.ajax({
				"type": "get",
				"url": "./json/goods.json",
				"dataType": "json",
				"success" : function(data){
					window.showpage = new Showpage(data,"#goodslist").init();
					$("#totalgoods").text(showpage.total);
					$("#nowpage").text(showpage.currPage);
					$("#totalpage").text(showpage.pageNum);
					showpage.show();
				}
			});
		
			$("#pagepre").click(function() {
				$.ajax({
					"type": "get",
					"url": "./json/goods.json",
					"dataType": "json",
					"success" : function(data){
						showpage.showPrePage();
						$("#nowpage").text(showpage.currPage);
					}
				});
			});
			
			$("#pagenext").click(function(){
				$.ajax({
					"type": "get",
					"url": "./json/goods.json",
					"dataType": "json",
					"success" : function(data){
						showpage.showNextPage();
						$("#nowpage").text(showpage.currPage);
					}
				});
			});
		
		})

	});
});