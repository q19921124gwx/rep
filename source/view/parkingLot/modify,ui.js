/**
 * related to template.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-09
 */
var root = ui("$");
var numLabel = ui("numLabel");
var price = ui("priceText");
var location = ui("locationText");
var pic = ui("pic");
var modified = ui("modified");
var picker = sm("do_DateTimePicker");
var rootLayout = ui("rootLayout");
var global = sm("do_Global");
var page = sm("do_Page");
var listView = ui("listView");
var timeData = [{}];
var flag;
var title0;
var source0;
var timeData0;
var location0;
var price0;
var lay = ui("do_ALayout_1");
var nf = sm("do_Notification");
lay.on("touch",function() {
	price.enabled = true;
});

var tag = [
           {week1 : ""},
           {week2 : ""},
           {index1 : ""},
           {index2 : ""}
];
var listData = mm("do_ListData");
var app = sm("do_App");
var page = sm("do_Page");

modified.on("touch",function() {
	var data = [{
		title : numLabel.text,
		source : pic.source,
		timeData : JSON.stringify({
			time1 : timeData[0].time1,
			time2 : timeData[0].time2,
			week1 : timeData[0].week1,
			week2 : timeData[0].week2
		}),
		location : location.text,
		price : price.text,
		tag : rootLayout.tag
	}];
	page.fire("modified",data);
});

//page.on("loaded",function() {
//	tag = rootLayout.tag;
//	listData.addData(tag);
//	listView.refreshItems();
//	title0 = numLabel.text;
//	source0 = pic.source;
//	timeData0 = layoutRoot.tag;
//	location0 = location.text;
//	price0 = price.text;
//});

page.on("selected",function(data) {
	timeData = data;
	listData.removeAll();
	listData.addData(data);
	listView.refreshItems();
});

function judgeChanged() {
	
}

page.on("back",function() {
	if(title0 != numLabel.text) {
		flag = false;
	}
	if(source0 != pic.source) {
		flag = false;
	}
	if(timeData0[0].week1 != timeData.week1) {
		flag = false;
	}
	if(timeData0[1].week2 != timeData.week2) {
		flag = false;
	}
	if(timeData0[2].time1 != timeData.week1) {
		flag = false;
	}
	if(timeData[3].time2 != timeData.week2) {
		flag = false;
	}
	if(timeData0 != layoutRoot.tag) {
		flag = false;
	}
	if(location0 != location.text) {
		flag = false;
	}
	if(price0 != price.text) {
		flag = false;
	}
	app.closePage();
});

root.setMapping({
	"numLabel.text" : "title",
	"pic.source" : "source",
	"rootLayout.tag" : "timeData",
	"location.text" : "",
	"price.text" : "price",
});

price.on("focusIn",function() {
	price.on();
});

