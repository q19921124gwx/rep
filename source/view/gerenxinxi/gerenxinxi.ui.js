var nf = sm("do_Notification");
var do_Global =sm("do_Global");
var do_Page =sm("do_Page");
var sex0;
var age0;
var phoneNumLabel = ui("phoneNumLabel");
var ageLabel = ui("ageLabel");
var sexLabel = ui("sexLabel");
var confirmButton = ui("confirmButton");
var portraitLayout = ui("portraitLayout");
var ageLayout = ui("ageLayout");
var sexLayout = ui("sexLayout");
var ALayout_gerenxinxi = ui("ALayout_gerenxinxi");
var userId;
var global = sm("do_Global");
var httpBody = {};
var config = require("config");
//存放用户信息的数组
var info;
var uiTools = require("uiTools");
var portraitChangedFlag = false;
page.on("back",function() {
	uiTools.closeMethod("userInfo",info);
});

ui("back").on("touch",function() {
	page.fire("back");
});
//判断是否至少有一条信息发生了变化
var infoChangedFlag = false;
var portraitImageView = ui("portraitImageView");
portraitImageView.source = config.ip + "/" + do_Global.getMemory("userInfo").portrait;
//点击确认修改，先逐个判断各个属性的数值相对进入页面后从服务器获得的数值是否被修改，
//如果被修改，在httpBody中添加当前属性的新值
//修改info的信息，如果点击了确认修改，且在服务器修改成功，就修改全局变量info，再次进入该界面时载入新的info
confirmButton.on("touch",function() {
	if(age0 != ageLabel.text) {
		info.age = ageLabel.text;
		httpBody.age = ageLabel.text;
	}
	if(sex0 != sexLabel.text) {
		httpBody.gender = sexLabel.text;
		info.gender = sexLabel.text;
	}
	for(prop in httpBody) {
		//通过判断用户是否修改来判断是否要在服务器中修改信息
		infoChangedFlag = true;
		break;
	}
	
	if(infoChangedFlag) {
		changeInfo();
	}
});


function changeInfo() {
	httpBody.userid = userId;
	httpBody = JSON.stringify(httpBody);
	var http = mm("do_Http");
	http.method = "post";
	http.contentType = "application/json";
	http.url = config.ip + "/uptusers";
	http.timeout = 30000;
	http.body = httpBody;
	http.on("fail",function() {
		webError();
	});
	http.on("success",function(data) {
		//根据data.SUCCESS判断是否在服务器端修改成功，并且判断服务器传来的数据是否为空
		if(data != null && data.SUCCESS != null) {
				if(data.SUCCESS == "000") {
					infoChangedFlag = false;
					//修改成功之后，更改初始值，httpBody = {}，再次点击确认修改不会
					//访问服务器
					age0 = ageLabel.text;
					sex0 = sexLabel.text;
					httpBody = {};
					//修改info的信息，如果点击了确认修改，且在服务器修改成功，就修改全局变量info，再次进入该界面时载入新的info
					global.setMemory("userInfo",info);
					nf.toast("信息修改成功");
				}
				else {
					webError();
				}
		}
	});
	http.on("fail",function() {
		webError();
	});
	http.request();
}

function changPortrait(portraitSource) {
	var http2 = mm("do_Http");
	http2.method = "post";
	http2.timeout = 30000;
	http2.url = config.ip +"/fromphoto";
	http2.contentType = "multipart/form-data";
	var data = {
			"files" : [ {
				"key" : "myFile",
				"value" : portraitSource
			} ],
			"texts" : [ {
				"key" : "userName",
				"value" : info.username
			} ]
	};
	 http2.form(data);
	global.setMemory("portraitChangedFlag",true);
	http2.on("success",function(data) {
		if(data != null && data.SUCCESS != null) {
			if(data.SUCCESS == "000") {
				global.setMemory("portraitChanged",true);
				portraitImageView.source = "source://image/？.png";
				portraitImageView.source = config.ip + "/" + do_Global.getMemory("userInfo").portrait;
				nf.toast("头像修改成功");
			}
			else {
				webError();
			}
		}
		else {
			webError();
		}
	});
	http2.on("fail",function() {
		webError();
	});
}
//修改信息失败时,触发该函数
function webError() {
	nf.toast("网络故障，请稍后重试");
};

do_Page.on("loaded",function() {
	//页面载入时，先获取从登录页面获取的存储用户表信息json串，
	//并将数组中的各个属性显示在用户客户端app的界面上
	info = global.getMemory("userInfo");
	ageLabel.text = info.age;
	sexLabel.text = info.gender;
	phoneNumLabel.text = info.tel;
	//设置变量来保存初始的各个属性的值，用来判断用户点击确认修改时是否有至少一个属性发生变化
	age0 = ageLabel.text;
	sex0 = sexLabel.text;
	userId = global.getMemory("userId");
});



//在do_ALayout_root上动态添加子视图(该视图初始化的脚本会将自身先隐藏)
ALayout_gerenxinxi.add("xingbiexuanze", "source://view/gerenxinxi/xingbiexuanze.ui", 0, 0);
var xingbiexuanze = ui("xingbiexuanze");
ALayout_gerenxinxi.add("nianlingxuanze", "source://view/gerenxinxi/nianlingxuanze.ui", 0, 0);
ALayout_gerenxinxi.add("touxiangshangchuan", "source://view/gerenxinxi/touxiangshangchuan.ui", 0, 0);
var touxiangshangchuan = ui("touxiangshangchuan");
var nianlingxuanze = ui("nianlingxuanze");


//选择性别
sexLayout.on("touch", function(data, e) {
	xingbiexuanze.show("fade", 200);
	do_Page.hideKeyboard();
});

//选择年龄
ageLayout.on("touch", function(data, e) {
	nianlingxuanze.show("fade", 200);
	do_Page.hideKeyboard();
});



//头像上传
portraitLayout.on("touch", function(data, e) {
	touxiangshangchuan.show("fade", 200);
	do_Page.hideKeyboard();
});

//在当前页面下订阅TypeChanged自定义消息
do_Page.on("TypeChanged", function(data){
	sexLabel.text=data;
});
do_Page.on("nianling", function(data){
	ageLabel.text=data;
});
do_Page.on("touxiang", function(data){
	changPortrait(data);
});

//返回按钮的返回事件

// 监听android 的返回按钮;


