define(["jquery"],function(){
	
	function GetData(){	
		this.getDataById = function(url_json,id,value,callback){
			$.ajax({
				type:"get",
				url:url_json,
				async:true,
				success :function(data){
					callback(data.filter(function(item){
						return item[id] == value;
					})[0]);	
				}
			});
		}
	}
	
	return new GetData();
});