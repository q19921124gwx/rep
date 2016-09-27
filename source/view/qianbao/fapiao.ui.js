var nf = sm("do_Notification");
var do_App = sm("do_App");
var do_Global =sm("do_Global");
var page =sm("do_Page");
var do_External = sm("do_External");
var config = require("config");
var global = sm("do_Global");
var fapiaosListView = ui("fapiaoListView");
var fapiaosDataArr;
var fapiaosListData = mm("do_ListData");
fapiaosListView.bindItems(fapiaosListData);
//声明UI组件
var do_ALayout_bohao = ui("do_ALayout_bohao");
var uiTools = require("uiTools");
page.on("back",function() {
	uiTools.closeMethod("myfapiaosMemory",fapiaosDataArr);
});

ui("back").on("touch",function() {
	page.fire("back");
});

//拨号
do_ALayout_bohao.on("touch", function(data, e){
	do_External.openDial(ui("do_Label_dianhua").text);
});

//返回按钮的返回事件

// 监听android 的返回按钮;

page.on("loaded",function() {
	fapiaosDataArr = global.getMemory("myfapiaosMemory");
	//如果将发票全部删除之后再次进入，JSON.stringify(fapiaosDataArr) == "[{}]"，
	//会出现一个没有发票的fapiaosListView的Cell
	if(JSON.stringify(fapiaosDataArr) == "[{}]") {
		
	}
	else {
		//fapiaosDataArr == "" 表明第一次进入，需要从服务器读取数据
		if(fapiaosDataArr == "") {
			getfapiaosDataOnLoaded();
		}
		//表明不是第一次进入，且没有删除所有的发票，可以从内存读取发票的数据
		else {
			fapiaosListData.addData(fapiaosDataArr);
			fapiaosListView.refreshItems();
		}
	}
});

function getfapiaosDataOnLoaded() {
	//先把字符串定义为一个空数组，避免下面addData的时候报错
	fapiaosDataArr = [{}];
	var http = mm("do_Http");
	http.timeout = 30000;
	http.method = "post";
	http.url = config.ip + "/getinvoices";
	http.contentType = "application/json";
	http.body = {
		"userid" : global.getMemory("userId")	
	};
	http.on("success",function(data) {
		if(data != null && data.data != null) {
			if(data.SUCCESS == 003) {
				//如果保存发票数据的数组没有元素，fapiaosDataArr已经为[{}];不用做任何操作
			}
			//如果保存发票数据的数组本来有元素，就将其从服务器获取后后显示在下面的fapiaosListView中
			else {
				if(data.SUCCESS == 000){
					fapiaosDataArr = data.data;
					fapiaosListData.removeAll();
					fapiaosListData.addData(fapiaosDataArr);
					fapiaosListView.refreshItems();
				}
				else {
					nf.toast("网络异常，请您稍后重试");
				}
			}
		}
	});
	http.on("fail",function(data) {
		//如果链接失败，将数组变为”“，防止下次进入时判断为已经成功进入了该页面并且将数据读取到了缓存中
		global.setMemory("myfapiaosMemory","");
		nf.toast("网络异常，请您稍后重试");
	});
	http.request();
}
