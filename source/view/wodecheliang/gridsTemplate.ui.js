/**
 * related to typeTemplate.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-01
 */
var root = ui("$");
var layout = ui("layout");
var page = sm("do_Page");
var global = sm("do_Global");
var label = ui("label");
var blackId;
var nf = sm("do_Notification");
root.setMapping({
	"label.text" : "text",
});

layout.on("touch",function() {
	//text1表示当前输入的字符 num表示当前输入的是车牌号的第几位
	//点击下面的gridView单元格触发输入的事件
	global.setMemory("text1",label.text);
	//下面两个事件见typechepai.ui.js
	page.fire("typeLabelRefresh",global.getMemory("num"));
	page.fire("refresh",global.getMemory("num"));
	//如果已经输入了7位，再输入就只是改变最后一位的文本
	if(global.getMemory("num") != "7") {
		global.setMemory("num",parseInt(global.getMemory("num")) + 1);
	}
});

