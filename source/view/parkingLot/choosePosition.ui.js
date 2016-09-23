/**
 * related to choosePosition.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-09
 */

var choosed = false;
var page = sm("do_Page");
var mark;
var lotNum = 0;
var map = ui("map");
var confirmButton = ui("confirmButton");
var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");
var global = sm("do_Global");
var satelliteButton = ui("satelliteButton");
var standardButton = ui("standardButton");
satelliteButton.on("touch",function() {
	map.mapType = "satellite";
});

standardButton.on("touch",function() {
	map.mapType = "standard";
});

map.zoomLevel = 17;


function addAParkingLot(data) {
	mark = {
			"id" : "positionChoosed",
			"latitude" : data.latitude,
			"longitude" : data.longitude,
			"url" : "source://image/wodecheliang/del.png",
			"info" : "myLot "+ lotNum +"Position"
		}
	map.addMarkers([mark]);
}


map.on("touchMap",function(data) {
	if(!choosed) {
		addAParkingLot(data);
		choosed = true;
	}
	else{
		map.removeMarker(["positionChoosed"]);
		addAParkingLot(data);
	}
});

confirmButton.on("touch",function() {
	if(mark != null) {
		nf.confirm("确认要选择这个位置吗", "确认选择位置", "确认","取消", function(num) {
			if(num == 1) {
				app.closePage({
					animationType : "fade",
				});
			}
		})
	}
});

page.on("loaded",function() {
	var location = global.getMemory("dingweizuobiao");
	map.setCenter(location.split(",")[0],location.split(",")[1]);
	map.addMarkers([{
		latitude : location.split(",")[0],
		longitude : location.split(",")[1],
		info : "我的当前位置",
		id : "mylocation",
		url : "source://image/mark.png"
	}]);
});

page.on("back",function() {
	app.closePage({
		data : mark
	});
});
