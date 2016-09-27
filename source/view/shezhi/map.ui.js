/**
 * related to map.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-05
 */
var page = sm("do_Page");
var app = sm("do_App");


page.on("back",function() {
	app.closePage();
});
ui("back").on("touch",function() {
	page.fire("back");
});