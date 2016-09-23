/**
 * related to register.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-06
 */
var app = sm("do_App");
var page = sm("do_Page");
var registerButton = ui("registerButton");
var userNameTf = ui("userNameTf");
var passWordTf = ui("passWordTf");
var userName = "";
var passWord = "";
var confirmPassWord = "";
var nf = sm("do_Notification");
var http;
var config = require("config");
var global = sm("do_Global");
var md5 = require("md5");
registerButton.on("touch",function() {
	//点击注册按钮注册
	userName = userNameTf.text ;
	passWord = passWordTf.text ;
	confirmPassWord = ui("confirmPassWordTf").text;
	if(userName == "" || passWord == "") {
		nf.toast("用户名和密码不能为空");
	}
	else {
		if(passWord != confirmPassWord) {
			nf.toast("两次输入的密码不一致");
		}
		else {
			passWord = md5.hex_md5(passWord.toString());
			http = mm("do_Http");
			http.timeout = 30000;
			http.method = "post";
			http.url = config.ip + "/setusers";
			http.contentType = "application/json";
			http.body = {
				"username" : "",
				"password" : passWord,
				"realname" : "",
				"age" : "",
				"gender" : "",
				"tel" : userName
//				"portrait" : ""
			};
			http.on("success",function(data) {
				if(data != null && data.data != null) {
					nf.alert(data);
					nf.alert(data.SUCCESS);
					switch(data.SUCCESS) {
						case "000" : {
							var userInfo = data.data[0];
							global.setMemory("userInfo",userInfo);
							global.setMemory("userId",userInfo.userid);
							nf.toast("注册成功");
							if(global.getMemory("state") == "3") {
								app.closePageToID("1","","index.ui");
							}
							else {
								app.openPage({
									source : "source://view/index.ui",
									data : 1,
									id : "index.ui"
								});
							}
							break;
						}
						case "007" : {
							nf.toast("该用户名已存在");
							break;
						}
						default : {
							nf.toast("网络故障，请稍后重试");
							break;
						}
					}
				}
				else {
					nf.toast("网络故障，请稍后重试");
				}
			});
			http.on("fail",function() {
				nf.toast("网络故障，请稍后重试");
			});
			http.request();
		}
	}
});

page.on("back",function() {
	app.closePage();
});


