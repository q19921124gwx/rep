var nf = sm("do_Notification");
var do_App = sm("do_App");
var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_External = sm("do_External");
var do_Storage = sm("do_Storage");
//声明UI组件
//var parkingLotLayout = ui("parkingLotLayout");
var do_ALayout_root = ui("do_ALayout_root1");
var do_ALayout_yc = ui("do_ALayout_yc");
var do_ALayout_touxiang = ui("do_ALayout_touxiang");
var do_ALayout_cheliang = ui("do_ALayout_cheliang");
var do_ALayout_qianbao = ui("do_ALayout_qianbao");
var do_ALayout_tingchejilu = ui("do_ALayout_tingchejilu");
var do_ALayout_xiaoxizhongxin = ui("do_ALayout_xiaoxizhongxin");
var do_ALayout_shezhi = ui("do_ALayout_shezhi");
var do_ALayout_kefu = ui("do_ALayout_kefu");
var do_ALayout_bohao = ui("do_ALayout_bohao");
var config = require("config");
var  userInfo = do_Global.getMemory("userInfo");
ui("bonusLabel").text = userInfo.integral;
ui("balanceLabel").text = 	userInfo.yue;
do_Page.on("loaded",function() {
	portraitOnLogIn();
});

function portraitOnLogIn() {
//	nf.alert(userInfo.portrait);
		ui("portrait").source = config.ip + "/" + userInfo.portrait;
}

do_Page.on("result",function() {
	if(do_Global.getMemory("portraitChanged") == "true") {
		ui("portrait").source = "source://image/？.png";
		ui("portrait").source = config.ip + "/" + do_Global.getMemory("userInfo").portrait;
		do_Global.setMemory("portraitChanged",false);
	}
});



do_Page.on("newUser",function() {
//	ui("portrait").source = "";
	userInfo = do_Global.getMemory("userInfo");
	ui("portrait").source = config.ip + "/" + userInfo.portrait;
	ui("bonusLabel").text = userInfo.integral;
	ui("balanceLabel").text = 	userInfo.yue;
});

////初始时要隐藏
do_ALayout_root.visible = false;
//点击其它区域，则隐藏关闭当前View
do_ALayout_yc.on("touch", function(){
	do_ALayout_root.visible = false;
});
//监听android 的返回按钮;
do_Page.on("back", function() {
	do_ALayout_root.visible = false;
});

//头像修改
do_ALayout_touxiang.on("touch", function(data, e){
	do_App.openPage({
		source:"source://view/gerenxinxi/gerenxinxi.ui",
		animationType:"push_r21"
	});
});

ui("layoutTop").on("touch",function() {
	
});

do_ALayout_touxiang.on("touchDown", function(data, e){
	do_ALayout_touxiang.bgColor = "C0C0C0FF";
});
do_ALayout_touxiang.on("touchUp", function(data, e){
	do_ALayout_touxiang.bgColor = "FFFFFFFF";
});

//我的车辆
do_ALayout_cheliang.on("touch", function(data, e){
	do_App.openPage({
		source:"source://view/wodecheliang/wodecheliang.ui",
		animationType:"push_r21"
	});
});
do_ALayout_cheliang.on("touchDown", function(data, e){
	do_ALayout_cheliang.bgColor = "C0C0C0FF";
});
do_ALayout_cheliang.on("touchUp", function(data, e){
	do_ALayout_cheliang.bgColor = "FFFFFFFF";
});

//我的钱包
do_ALayout_qianbao.on("touch", function(data, e){
	do_App.openPage({
		source:"source://view/qianbao/qianbao.ui",
		animationType:"push_r21"
	});
});
do_ALayout_qianbao.on("touchDown", function(data, e){
	do_ALayout_qianbao.bgColor = "C0C0C0FF";
});
do_ALayout_qianbao.on("touchUp", function(data, e){
	do_ALayout_qianbao.bgColor = "FFFFFFFF";
});

//停车记录
do_ALayout_tingchejilu.on("touch", function(data, e){
	do_App.openPage({
		source:"source://view/tingchejilu/tingchejilu.ui",
		animationType:"push_r21"
	});
});
do_ALayout_tingchejilu.on("touchDown", function(data, e){
	do_ALayout_tingchejilu.bgColor = "C0C0C0FF";
});
do_ALayout_tingchejilu.on("touchUp", function(data, e){
	do_ALayout_tingchejilu.bgColor = "FFFFFFFF";
});

//消息中心
do_ALayout_xiaoxizhongxin.on("touch", function(data, e){
	do_App.openPage({
		source:"source://view/xiaoxizhongxin/xiaoxizhongxin.ui",
		animationType:"push_r21"
	});
});
do_ALayout_xiaoxizhongxin.on("touchDown", function(data, e){
	do_ALayout_xiaoxizhongxin.bgColor = "C0C0C0FF";
});
do_ALayout_xiaoxizhongxin.on("touchUp", function(data, e){
	do_ALayout_xiaoxizhongxin.bgColor = "FFFFFFFF";
});

//设置
do_ALayout_shezhi.on("touch", function(data, e){
	do_App.openPage({
		source:"source://view/shezhi/shezhi.ui",
		animationType:"push_r21"
	});
});
do_ALayout_shezhi.on("touchDown", function(data, e){
	do_ALayout_shezhi.bgColor = "C0C0C0FF";
});
do_ALayout_shezhi.on("touchUp", function(data, e){
	do_ALayout_shezhi.bgColor = "FFFFFFFF";
});

//parkingLotLayout.on("touch",function() {
//	do_App.openPage({
//		source:"source://view/parkingLot/parkingLot.ui",
//		animationType:"push_r21"
//	});
//});

//parkingLotLayout.on("touchDown", function(data, e){
//	parkingLotLayout.bgColor = "C0C0C0FF";
//});
//parkingLotLayout.on("touchUp", function(data, e){
//	parkingLotLayout.bgColor = "FFFFFFFF";
//});

do_ALayout_kefu.on("touch", function(data, e){});

do_ALayout_bohao.on("touch", function(data, e){
	do_External.openDial(ui("do_Label_dianhua").text);
});

