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


var uiTools = require("uiTools");
uiTools.closeMethod(ui("back"));

layoutFenxiang.on("touch",function() {
	share.share({
		title : "title",
		content : "content"
	});
});