var nf = sm("do_Notification");
var do_App = sm("do_App");
var do_Global =sm("do_Global");
var do_Page =sm("do_Page");

//声明UI组件
var do_ALayout_yuechongzhi = ui("do_ALayout_yuechongzhi");
var do_ALayout_jifen = ui("do_ALayout_jifen");
var do_ALayout_kuaijiezhifu = ui("do_ALayout_kuaijiezhifu");
var do_ALayout_tingchequan = ui("do_ALayout_tingchequan");
var do_ALayout_fapiao = ui("do_ALayout_fapiao");
var uiTools = require("uiTools");
uiTools.closeMethod(ui("back"));
//余额支付
do_ALayout_yuechongzhi.on("touch", function(data, e) {
	do_App.openPage({
		source:"source://view/qianbao/yuechongzhi.ui",
		animationType:"push_r21"
	});
});
do_ALayout_yuechongzhi.on("touchDown", function(data, e){
	do_ALayout_yuechongzhi.bgColor = "C0C0C0FF";
});
do_ALayout_yuechongzhi.on("touchUp", function(data, e){
	do_ALayout_yuechongzhi.bgColor = "FFFFFFFF";
});
//积分
do_ALayout_jifen.on("touch", function(data, e) {
	nf.toast("正在生产中，敬请期待！");
});
do_ALayout_jifen.on("touchDown", function(data, e){
	do_ALayout_jifen.bgColor = "C0C0C0FF";
});
do_ALayout_jifen.on("touchUp", function(data, e){
	do_ALayout_jifen.bgColor = "FFFFFFFF";
});
//快捷支付
do_ALayout_kuaijiezhifu.on("touch", function(data, e) {
	nf.toast("此功能暂未开放，敬请期待！");
});
do_ALayout_kuaijiezhifu.on("touchDown", function(data, e){
	do_ALayout_kuaijiezhifu.bgColor = "C0C0C0FF";
});
do_ALayout_kuaijiezhifu.on("touchUp", function(data, e){
	do_ALayout_kuaijiezhifu.bgColor = "FFFFFFFF";
});
//停车券
do_ALayout_tingchequan.on("touch", function(data, e) {
	do_App.openPage({
		source:"source://view/qianbao/tingchequan.ui",
		animationType:"push_r21"
	});
});
do_ALayout_tingchequan.on("touchDown", function(data, e){
	do_ALayout_tingchequan.bgColor = "C0C0C0FF";
});
do_ALayout_tingchequan.on("touchUp", function(data, e){
	do_ALayout_tingchequan.bgColor = "FFFFFFFF";
});
//发票
do_ALayout_fapiao.on("touch", function(data, e) {
	do_App.openPage({
		source:"source://view/qianbao/fapiao.ui",
		animationType:"push_r21"
	});
});
do_ALayout_fapiao.on("touchDown", function(data, e){
	do_ALayout_fapiao.bgColor = "C0C0C0FF";
});
do_ALayout_fapiao.on("touchUp", function(data, e){
	do_ALayout_fapiao.bgColor = "FFFFFFFF";
});


