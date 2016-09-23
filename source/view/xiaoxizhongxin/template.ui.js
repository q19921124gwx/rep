/**
 * related to template.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-01
 */
var root = ui("$");
var msgRoot = ui("msgRoot");
var msgLay = ui("msgLay");
var app = sm("do_App");
var msgLabel = ui("msgLabel");
var layDelete = ui("layDelete");
var page = sm("do_Page");
var nf = sm("do_Notification");
var cache = sm("do_DataCache");

root.setMapping({
	"msgLabel.text" : "messagetle",
	"msgRoot.id" : "messageid",
	"msgLabel.tag" : "messagecon"
});

layDelete.on("touch",function() {
	nf.confirm("你真的确定要删除这条消息吗","确认删除",function(data, e) {
		if(data == 1) {
			var data = msgRoot.id;
			page.fire("deleteAMsg",data);
		}
	});
});

msgLay.on("touch",function() {
	cache.saveData(msgLabel.text,msgLabel.tag);
	app.openPage({
		source : "source://view/xiaoxizhongxin/msgDetails.ui",
		data : msgLabel.text
	});
});