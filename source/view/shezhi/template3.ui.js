/**
 * related to template3.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-12
 */
var lay = ui("lay");
var label = ui("label");
var root = ui("$");
var app = sm("do_App");
var global = sm("do_Global");
var app = sm("do_App");
var nf = sm("do_Notification");
root.setMapping({
	"label.text" : "text"
});

lay.on("touch",function() {
	nf.confirm("确认退出登录吗", "确认退出登录",function(data) {
		if(data == 1) {
			global.setMemory("userInfo","");
			global.setMemory("userId","");
			global.setMemory("state","3");
			app.closePage({
				data : "0",
			});
		}
	});
});