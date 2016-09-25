var nf = sm("do_Notification");
var do_App = sm("do_App");
var do_Global =sm("do_Global");
var do_Page =sm("do_Page");
var do_BaiduNavigate = sm("do_BaiduNavigate");
var uiTools = require("uiTools");
uiTools.closeMethod(ui("back"));
//声明UI组件
var do_Button_daohang = ui("do_Button_daohang");
var do_Label_TCCname = ui("do_Label_TCCname");
var do_Label_TCCname2 = ui("do_Label_TCCname2");

//自定义变量

var dingweizuobiao = "";//定位坐标
var zhongdian = ""; //导航终点坐标

do_Label_TCCname.text = do_Global.getMemory("text");
do_Label_TCCname2.text = do_Global.getMemory("text");

//返回按钮的返回事件


//导航按钮事件
do_Button_daohang.on("touch", function() {
	dingweizuobiao = do_Global.getMemory("dingweizuobiao");
	zhongdian = do_Global.getMemory("zhongdian");
	do_BaiduNavigate.start(dingweizuobiao, zhongdian);
});

//按下导航按钮时的变化
do_Button_daohang.on("touchDown", function() {
	do_Button_daohang.bgColor = "FFFFFFFF";
	do_Button_daohang.fontColor = "000000FF";
});

////离开导航按钮的变化
do_Button_daohang.on("touchUp", function() {
	do_Button_daohang.bgColor = "04ADFFFF";
	do_Button_daohang.fontColor = "FFFFFFFF";
});