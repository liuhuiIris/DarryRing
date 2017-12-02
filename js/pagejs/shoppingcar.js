require(["config"],function(){
	require(["jquery","jquery.cookie"],function($){
		var idList = [];
		var carlist = [];
		if($.cookie("shoppingcar")){
			idList = $.cookie("shoppingcar").split(",");
			
			$.ajax({
				url : "json/goods.json",
				success : function(data){
					idList.forEach(function(item){
						var temp = data.filter(function(i){
							return i.dimond_id == item;
						})[0];
						
						
						$(".car_title").after("<tr>"
							+"<td><input type='checkbox' name='' id='' value='' index='"+ (carlist.push(temp)-1) +"' /></td>"
							+"<td><img src='"+ temp.src +"'/></td>"
							+"<td>"+ temp.series +"</td>"
							+"<td>16</td>"
							+"<td>love</td>"
							+"<td>￥"+ temp.price +"</td></tr>");
					});
				}
			})
		}

		var total = 0;
		var count = 0;
		$("input:first").click(function(){
			if($(this).prop("checked")){
				$("input:gt(0)").prop("checked","checked");
				var precres = carlist[0].price;
				for(var i in carlist){
					total += Number(carlist[i].price);
					count++;
				}
			}else{
				$("input:gt(0)").removeProp("checked");
				total = 0;
				count = 0;
			}
			$(".count").text(count);
			$(".total").text("￥"+total);
		});
		
		$(".car_list").click(function(e){
			e =  e || event;
			if(e.target.nodeName=="INPUT"){
				if($(e.target).attr("index")>=0){
					if($(e.target).prop("checked")){
						total += Number(carlist[$(e.target).attr("index")].price);
						count++;
					}else{
						total -= Number(carlist[$(e.target).attr("index")].price);
						count--;
					}
				}
				
				$(".count").text(count);
				$(".total").text("￥"+total);
				
				if($("input:gt(0)").filter(function(){return $(this).prop("checked");}).size() == idList.length){
					$("input:first").prop("checked","checked");
				} else {
					$("input:first").prop("checked","");
				}
			}
		});
		
		
	});
});
