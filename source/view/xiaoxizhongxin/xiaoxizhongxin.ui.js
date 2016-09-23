var do_App = sm("do_App");
var do_Page =sm("do_Page");
var msgsListView = ui("msgListView");
var httpBody;
var msgsDataArr;
var msgsListData = mm("do_ListData");
msgsListView.bindItems(msgsListData);

//声明UI组件
//var do_ALayout_fanhui = ui("do_ALayout_fanhui");
var global = sm("do_Global");
var config = require("config");
var nf = sm("do_Notification");
//返回按钮的返回事件
//do_ALayout_fanhui.on("touch", function() {
//	do_App.closePage();
//})

// 监听android 的返回按钮;
//do_Page.on("back", function() {
//	global.setMemory("myMsgsMemory",msgsDataArr);
//	do_App.closePage()
//});
var uiTools = require("uiTools");
uiTools.closeMethod(ui("back"),"myMsgsMemory",msgsDataArr);

do_Page.on("loaded",function() {
	msgsDataArr = global.getMemory("myMsgsMemory");
	//如果将消息全部删除之后再次进入，JSON.stringify(msgsDataArr) == "[{}]"，
	//会出现一个没有消息的msgsListView的Cell
	if(JSON.stringify(msgsDataArr) == "[{}]") {
		
	}
	else {
		//msgsDataArr == "" 表明第一次进入，需要从服务器读取数据
		if(msgsDataArr == "") {
			getMsgsDataOnLoaded();
		}
		//表明不是第一次进入，且没有删除所有的消息，可以从内存读取消息的数据
		else {
			msgsListData.addData(msgsDataArr);
			msgsListView.refreshItems();
		}
	}
});








function getMsgsDataOnLoaded() {
	//先把字符串定义为一个空数组，避免下面addData的时候报错
	msgsDataArr = [{}];
	var http = mm("do_Http");
	http.timeout = 30000;
	http.method = "post";
	http.url = config.ip + "/getmessages";
	http.contentType = "application/json";
	http.body = {
		"userid" : global.getMemory("userId")	
	};
	http.on("success",function(data) {
		if(data != null && data.data != null) {
			if(data.SUCCESS == 003) {
				//如果保存消息数据的数组没有元素，msgsDataArr已经为[{}];不用做任何操作
			}
			//如果保存消息数据的数组本来有元素，就将其从服务器获取后后显示在下面的msgsListView中
			else {
				if(data.SUCCESS == 000){
					msgsDataArr = data.data;
					msgsListData.removeAll();
					msgsListData.addData(msgsDataArr);
					msgsListView.refreshItems();
				}
				else {
					nf.toast("网络异常，请您稍后重试");
				}
			}
		}
	});
	http.on("fail",function(data) {
		//如果链接失败，将数组变为”“，防止下次进入时判断为已经成功进入了该页面并且将数据读取到了缓存中
		msgsDataArr = "";
		nf.toast("网络异常，请您稍后重试");
	});
	http.request();
}

do_Page.on("deleteAMsg",function(data) {
	var msgId = data;
	var http2 = mm("do_Http");
	http2.method = "post";
	http2.timeout = 30000;
	http2.url = config.ip + "/detmessages";
	http2.contentType = "application/json";
	http2.body = {
		"messageid" : msgId
	};
	http2.on("success",function(data) {
		if(data.SUCCESS == 000) {
			//如果从服务器中删除成功，就再从msgsListView中将消息删除
			for(var i = 0;i < msgsDataArr.length;i++) {
				nf.alert(msgId + "     " + msgsDataArr[i].messageid);
				if(msgId == msgsDataArr[i].messageid) {
					msgsDataArr.splice(i,1);
					msgsListData.removeData([i]);
					msgsListView.refreshItems();
					break;
				}
			}
		}
		else {
			nf.toast("网络异常，请您稍后重试");
		}
	});
	http2.on("fail",function(data) {
		nf.toast("网络异常，请您稍后重试");
	});
	http2.request();
});

