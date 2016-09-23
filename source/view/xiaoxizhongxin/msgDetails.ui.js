/**
 * related to msgDetails.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-01
 */
var data;
var page = sm("do_Page");
var app = sm("do_App");
var msgCon = ui("msgCon");
var title = ui("title");
var cache = sm("do_DataCache");
var uiTools = require("uiTools");
uiTools.closeMethod(ui("back"),"myMsgsMemory",msgsDataArr);

page.on("loaded",function() {
	data = page.getData();
	title.text = data;
	msgCon.text = cache.loadData(data);
	cache.removeData(data);
});