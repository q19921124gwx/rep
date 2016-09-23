/**
 * related to detail.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-02
 */
var page = sm("do_Page");
var data;
var num = ui("num");
var address= ui("address");
var price= ui("price");
var stime= ui("stime");
var etime= ui("etime");
var totaltime= ui("totaltime");
var totalprice= ui("totalprice");
var root = ui("$");
//var del = ui("delButton");
root.setMapping({
	"stime.text" : "recordcon",
	"stime.tag" : "recordid"
});
page.on("back",function() {
	root.visible = false;
});
page.on("loaded",function() {
	data = page.getData();
});

//layDelete.on("touch",function() {
//	nf.confirm("你真的确定要删除这条停车吗","确认删除",function(data, e) {
//		if(data == 1) {
//			var data = stime.tag.tag;
//			page.fire("deleteAMsg",data);
//		}
//	});
//});