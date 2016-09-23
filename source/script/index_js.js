module.exports.BiaoJiShuZu = function(data){
	var mark= Array();
	for(var i = 0;i<data.length;i++){
		mark[i] ={"id":"id"+i,"latitude":data[i].pt.split(",")[0],"longitude":data[i].pt.split(",")[1],"url":"source://image/close.png","info":data[i].name};
	}
	return mark;
}