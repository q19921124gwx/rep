/**
 * related to fenxiang.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-05
 */
var page = sm("do_Page");
var app = sm("do_App");
var layoutFenxiang = ui("layoutFenxiang");
var share = sm("M0011_share");


page.on("back",function() {
	app.closePage();
});
ui("back").on("touch",function() {
	page.fire("back");
});

layoutFenxiang.on("touch",function() {
	share.share({
		title : "title",
		content : "content"
	});
});