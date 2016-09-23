/**
 * related to forget.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-06
 */
var app = sm("do_App");
var page = sm("do_Page");

page.on("back",function() {
	app.closePage();
});

