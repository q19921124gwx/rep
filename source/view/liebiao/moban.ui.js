
var nf = sm("do_Notification");
var do_App = sm("do_App");
var do_Global =sm("do_Global");
var do_Page =sm("do_Page");
var do_BaiduNavigate = sm("do_BaiduNavigate");

var ALayout_root = ui("ALayout_root");//一定需要获取rootview的ui对象，才能作为listview的cell模板使用。
//var root = ui("$");//$是通配符表示rootview对象，这句和上一句代码一个意思
var do_ALayout_xiangqing = ui("do_ALayout_xiangqing");
var do_ALayout_daohang = ui("do_ALayout_daohang");
var do_BaiduMapView = ui("do_BaiduMapView_moban");
var do_Label_juli = ui("do_Label_juli");

var dingweizuobiao = do_Global.getMemory("dingweizuobiao");
ALayout_root.setMapping({
	"do_Label_name.text" : "name",
	"do_Label_name2.text" : "name",
	"do_Label_pt.text" : "pt",
});
var delay3 =mm("do_Timer");
delay3.delay = 100;
delay3.start();
delay3.on("tick", function() {
	do_Label_juli.text = do_BaiduMapView.getDistance(dingweizuobiao, ui("do_Label_pt").text).toFixed()+"米";
	delay3.stop();
});

do_ALayout_xiangqing.on("touch", function() {
	do_Global.setMemory("text",ui("do_Label_name").text);
	do_Global.setMemory("zhongdian", ui("do_Label_pt").text);
	do_App.openPage({
		source:"source://view/TCCXiangQing/main.ui",
		animationType:"push_r21"
	});
});

//导航按钮事件
do_ALayout_daohang.on("touch", function() {
	do_BaiduNavigate.start(dingweizuobiao, ui("do_Label_pt").text);
});