var nf = sm("do_Notification");
var do_App = sm("do_App");
var do_Global =sm("do_Global");
var do_Page =sm("do_Page");

//声明UI组件
var do_ImageView_yibai = ui("do_ImageView_yibai");
var do_ImageView_erbai = ui("do_ImageView_erbai");
var do_ImageView_wubai = ui("do_ImageView_wubai");
var do_TextField_jine = ui("do_TextField_jine");


do_ImageView_yibai.on("touch", function() {
	do_ImageView_yibai.source="source://image/qianbao/yibai_pre.png";
	do_ImageView_erbai.source="source://image/qianbao/erbai.png";
	do_ImageView_wubai.source="source://image/qianbao/wubai.png";
	do_TextField_jine.text = "100";
});
do_ImageView_erbai.on("touch", function() {
	do_ImageView_yibai.source="source://image/qianbao/yibai.png";
	do_ImageView_erbai.source="source://image/qianbao/erbai_pre.png";
	do_ImageView_wubai.source="source://image/qianbao/wubai.png";
	do_TextField_jine.text = "200";
});
do_ImageView_wubai.on("touch", function() {
	do_ImageView_yibai.source="source://image/qianbao/yibai.png";
	do_ImageView_erbai.source="source://image/qianbao/erbai.png";
	do_ImageView_wubai.source="source://image/qianbao/wubai_pre.png";
	do_TextField_jine.text = "500";
});

do_TextField_jine.on("textChanged", function(data, e) {
    if(do_TextField_jine.text != "100"){
    	do_ImageView_yibai.source="source://image/qianbao/yibai.png";
    }
    if(do_TextField_jine.text != "200"){
    	do_ImageView_erbai.source="source://image/qianbao/erbai.png";
    }
    if(do_TextField_jine.text != "500"){
    	do_ImageView_wubai.source="source://image/qianbao/wubai.png";
    }
});
//返回按钮的返回事件

// 监听android 的返回按钮;
var uiTools = require("uiTools");
uiTools.closeMethod(ui("back"));