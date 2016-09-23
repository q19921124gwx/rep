/**
 * related to parkingLot.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-09
 */
var app = sm("do_App");
var add = ui("addLayout");
var page = sm("do_Page");
var num = 0;
var global = sm("do_Global");
var listView = ui("listView");
var listData = mm("do_ListData");
listView.bindItems(listData);

add.on("touch",function() {
	app.openPage({
		source : "source://view/parkingLot/choosePosition.ui",
		animationType : "fade"
	});
});

page.on("result",function() {
	var datas = 
	[
	 {	
		title : num + 1,
		source : "",
		location : "",
		price : "",
		tag : ""
	}
   ];
	listData.removeAll();
	listData.addData(datas);
	listView.refreshItems();
});



page.on("back",function() {
	app.closePage();
});

page.on("modified",function(cellData) {
	var number = parseInt(cellData.title) - 1;
	data[number].price = cellData.price;
	data[number].title = cellData.title;
	data[number].time1 = cellData.time1;
	data[number].time2 = cellData.time2;
	data[number].source = cellData.source;
	data[number].location = cellData.location;
	listData.updateOne(num,{
		price : cellData.price, 
		title : cellData.title, 
		time1 : cellData.time1, 
		time2 : cellData.time2, 
		source : cellData.source, 
		location : cellData.location 
	});
	listView.refreshItems();
});
