/**
 * related to logIn.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-06
 */
var app = sm("do_App");
var page = sm("do_Page");
var buttonPass = ui("buttonPass");
var forget = ui("forget");
var register = ui("register");
var logButton = ui("logButton");
var userNameTf = ui("userNameTf");
var passWordTf = ui("passWordTf");
var nf = sm("do_Notification");
var userName;
var passWord;
var global = sm("do_Global");
var config = require("config");
var state;
var md5 = require("md5");
var verify = require("verify");
var xinxiFlag;
//var id;







buttonPass.on("touch",function(){
	if(global.getMemory("state") == "3") {
		app.closePage("0");
	}
	else {
		app.openPage({
			source : "source://view/index.ui"
		});
		global.setMemory("state","3");
	}
});
//state=1 : 第一次登陆  state=2 : 跳过 state=3 : 登陆后退出登录


//定义进入index.ui界面的函数，如果传入0，表示未登陆，在触摸个人信息do_ALayout_gerenxinxi时会返回该登陆界面，
//1表示已经登陆，可以进入个人信息界面进行操作
function closePage(state) {
	app.openPage({
		source : "source://view/index.ui",
		animationType : "fade",
		data : state,
		id : "index.ui"
	});
}

logButton.on("touch",function() {
	//点击登陆按钮登陆
	userName = userNameTf.text.trim();
	var pswd = passWordTf.text.trim();
	var cell = [
	    [userName,"用户名不能为空:用户名不符合要求","tel"],
	    [pswd,"密码不能为空:密码长度只能为6到12位","pswd"]
	];
	if(verify.verify(cell)) {
		passWord = md5.hex_md5(passWordTf.text.toString());
		var http = mm("do_Http");
		http.timeout = 30000;
		http.method = "post";
		http.url = config.ip + "/login";
		http.contentType = "application/json";
		http.body = {
			"tel" : userName,
			"password" : passWord
		};
		http.on("success",function(data) {
			if(data != null &&data.data != null) {
				if(data.SUCCESS != null) {
					switch(data.SUCCESS) {
					case "000" :
						//global.getMemory("state") == "3"表明登陆之后退出登录 
						//链接成功后，将用户信息存储到内存
						global.setMemory("userInfo",data.data[0]);
						global.setMemory("userId",data.data[0].userid);
					if(global.getMemory("state") == "3") {
						app.closePage("1");
					}
					else {
						closePage("1");
					}
					nf.toast("登陆成功");
					break;
					case "008" :
						break;
					default :
						nf.toast("网络故障，请稍后重试");
					break;
					}
				}
			}
		});
		http.on("fail",function(data) {
			nf.toast("网络错误");
		});
		http.request();
	}
	
//	if(userName == "" || passWord == "") {
//		nf.toast("用户名和密码不能为空");
//	}
//		else {
			
//		}
	}
);


register.on("touch",function() {
	app.openPage({
		source : "source://view/register.ui",
		animationType : "fade"
	});
});

forget.on("touch",function() {
	app.openPage({
		source : "source://view/forget.ui",
		animationType : "fade"
	});
});


var canBack = false;
var delay3 =mm("do_Timer");
delay3.delay = 30000;
delay3.on("tick", function() {
	delay3.stop();
	canBack = false;
});

page.on("back", function() {
	if(canBack){
		global.exit();
	} else{
		nf.toast("再次点击退出应用");
		canBack = true;
		delay3.start();
	}
});



