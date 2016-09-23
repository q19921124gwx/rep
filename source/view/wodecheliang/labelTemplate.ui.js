/**
 * related to labelTemplate.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-06
 */
var root = ui("$");
var layout = ui("layout");
var page = sm("do_Page");
var label = ui("label");
var nf = sm("do_Notification");
var global = sm("do_Global");
var num;

//当前要输入的车牌号的label的边框为黑色，id表示车牌号单元格，通过id来判断哪个单元格被选中
root.setMapping({
	"layout.id" : "id",
	"label.text" : "text",
	"layout.bgColor" : "color"
});

//在触摸该输入框时，触发choose函数，见typechepai.ui.js
layout.on("touch",function() {
	page.fire("choose",layout.id);
});