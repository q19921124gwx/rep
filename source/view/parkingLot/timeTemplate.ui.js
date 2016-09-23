/**
 * related to timeTemplate.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-12
 */
var picker = sm("do_DateTimePicker");
var week1Lay = ui("week1Lay");
var week2Lay = ui("week2Lay");
var time1Lay = ui("time1Lay");
var time2Lay = ui("time2Lay");
var time1Label = ui("time1Label");
var time2Label = ui("time2Label");
var week1Label = ui("week11Label");
var week22Label = ui("week21Label");
var timePicker = sm("do_DateTimePicker");
var picker1 = ui("picker1");
var picker2 = ui("picker2");
var weekData = ["一","二","三","四","五","六","七"];
var listData = mm("do_ListData");
listData.addData(weekData);
var page = sm("do_Page");
var rootLayout = ui("rootLayout");
picker1.bindItems(listData);
picker2.bindItems(listData);
var root = ui("$");

picker1.on("touch",function(index) {
	picker1.index = index;
});

rootLayout.on("touch",function() {
	picker1.hide;
});

root.setMapping({
	"rootLayout.tag" : "tag"
});




enSureButton.on("touch",function() {
	var data = [
	            
			{
				week1 : week1Label.text
			},
			{
				week2 : week2Label.text
			},
			{
				index1 : picker1.index
			},
			{
				index2 : picker2.index
			}
	];
	page.fire("selected",data);
});


