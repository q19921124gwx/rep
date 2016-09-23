/**
 * related to tingchejilu.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-02
 */
var page = sm("do_Page");
var app = sm("do_App");
var recsListView = ui("listView");
var recsListData = mm("do_ListData");
var recsDataArr;
var nf = sm("do_Notification");
var config = require("config");
var global = sm("do_Global");
recsListView.bindItems(recsListData);

var uiTools = require("uiTools");
uiTools.closeMethod(ui("back"),"recsMemory",recsDataArr);

page.on("loaded",function() {
	recsDataArr = global.getMemory("recsMemory");
	//如果将停车记录全部删除之后再次进入，JSON.stringify(recsDataArr) == "[{}]"，
	//会出现一个没有停车记录的recsListView的Cell
	if(JSON.stringify(recsDataArr) == "[{}]") {
		
	}
	else {
		//recsDataArr == "" 表明第一次进入，需要从服务器读取数据
		if(recsDataArr == "") {
			getrecsDataOnLoaded();
		}
		//表明不是第一次进入，且没有删除所有的停车记录，可以从内存读取停车记录的数据
		else {
			recsListData.addData(recsDataArr);
			recsListView.refreshItems();
		}
	}
});

function getrecsDataOnLoaded() {
	//先把字符串定义为一个空数组，避免下面addData的时候报错
	recsDataArr = [{}];
	var http = mm("do_Http");
	http.timeout = 3000;
	http.method = "post";
	http.url = config.ip + "/getrecords";
	http.contentType = "application/json";
	http.body = {
		"userid" : global.getMemory("userId")	
	};
	http.on("success",function(data) {
		if(data != null && data.data != null) {
			if(data.SUCCESS == 003) {
				//如果保存停车记录数据的数组没有元素，recsDataArr已经为[{}];不用做任何操作
			}
			//如果保存停车记录数据的数组本来有元素，就将其从服务器获取后后显示在下面的recsListView中
			else {
				if(data.SUCCESS == 000){
					recsDataArr = data.data;
					recsListData.removeAll();
					recsListData.addData(recsDataArr);
					recsListView.refreshItems();
				}
				else {
					nf.toast("网络异常，请您稍后重试");
				}
			}
		}
	});
	http.on("fail",function(data) {
		//如果链接失败，将数组变为”“，防止下次进入时判断为已经成功进入了该页面并且将数据读取到了缓存中
		recsDataArr = "";
		nf.toast("网络异常，请您稍后重试");
	});
	http.request();
}


