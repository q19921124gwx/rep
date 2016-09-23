/**
 * related to couponTemplate.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-18
 */

var parkingmianzhi = ui("parkingmianzhiLabel"); 
var parkingname = ui("parkingnameLabel"); 
var root = ui("$");
var page = sm("do_Page");
var app = sm("do_App");
var nf = sm("do_Notification");
var delButton = ui("delButton");
var youxiaoqiTitle = ui("youxiaoqiTitle");
root.setMapping({
	"parkingmianzhiLabel.text" : "parkingmianzhi",
	"parkingnameLabel.text" : "parkingname",
	"youxiaoqiLabel.text" : "youxiaoqi",
	"parkingmianzhiLabel.tag" : "parkingid",
	"parkingnameLabel.tag" : "state",
	"youxiaoqiLabel.fontColor" : "color",
	"youxiaoqiTitle.fontColor" : "color"
});


delButton.on("touch",function() {
	nf.alert("roych");
	nf.confirm("确认要删除这个停车券吗","确认删除",function(data) {
		if(data == 1) {
			page.fire("del",parkingmianzhi.tag);
		}
	});
});
