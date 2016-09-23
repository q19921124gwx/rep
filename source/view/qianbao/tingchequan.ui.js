var nf = sm("do_Notification");
var do_App = sm("do_App");
var global =sm("do_Global");
var do_Page =sm("do_Page");
var config = require("config");
var layoutNone = ui("layoutNone");
//声明UI组件
var couponsDataArr;
var couponsListData = mm("do_ListData");
var couponsListView = ui("couponListView");
couponsListView.bindItems(couponsListData);
var uiTools = require("uiTools");
uiTools.closeMethod(ui("back"),"mycouponsMemory",couponsDataArr);


do_Page.on("loaded",function() {
	couponsDataArr = global.getMemory("mycouponsMemory");
	//如果将停车券全部删除之后再次进入，JSON.stringify(couponsDataArr) == "[{}]"，
	//会出现一个空的couponsListView的Cell
	if(JSON.stringify(couponsDataArr) == "[{}]") {
		layoutNone.show();
	}
	else {
		//couponsDataArr == "" 表明第一次进入，需要从服务器读取数据
		if(couponsDataArr == "") {
			getcouponsDataOnLoaded();
		}
		//表明不是第一次进入，且没有删除所有的停车券，可以从内存读取停车券的数据
		else {
			var state;
			layoutNone.hide();
			couponsListData.addData(couponsDataArr);
			couponsListView.refreshItems();
		}
	}
});

function getcouponsDataOnLoaded() {
	//先把字符串定义为一个空数组，避免下面addData的时候报错
	couponsDataArr = [{}];
	var http = mm("do_Http");
	http.timeout = 30000;
	http.method = "post";
	http.url = config.ip + "/gettingchequans";
	http.contentType = "application/json";
	http.body = {
		"userid" : global.getMemory("userId")	
	};
	http.on("success",function(data) {
		if(data != null && data.data != null) {
			if(data.SUCCESS == "003") {
				//如果保存停车券数据的数组没有元素，couponsDataArr已经为[{}];不用做任何操作
				layoutNone.show();
			}
			//如果保存停车券数据的数组本来有元素，就将其从服务器获取后后显示在下面的couponsListView中
			else {
				if(data.SUCCESS == "000"){
					couponsDataArr = data.data;
					for(var x = 0;x < couponsDataArr.length;x++) {
						state = couponsDataArr[x].state;
						//state = 1，表明过期，颜色变为红色
						if(state == "1") {
							couponsDataArr[x].color = "FF8080FF";
						}
						else {
							couponsDataArr[x].color = "000000FF";
						}
					}
					layoutNone.hide();
					couponsListData.removeAll();
					couponsListData.addData(couponsDataArr);
					couponsListView.refreshItems();
				}
				else {
					nf.toast("网络异常，请您稍后重试");
				}
			}
		}
		else {
			layoutNone.show();
		}
	});
	http.on("fail",function(data) {
		//如果链接失败，将数组变为”“，防止下次进入时判断为已经成功进入了该页面并且将数据读取到了缓存中
		couponsDataArr = "";
		nf.toast("网络异常，请您稍后重试");
	});
	http.request();
}

do_Page.on("del",function(data) {
	var couponId = data;
	var http2 = mm("do_Http");
	http2.method = "post";
	http2.timeout = 30000;
	http2.url = config.ip + "/dettingchequans";
	http2.contentType = "application/json";
	http2.body = {
		"parkingid" : couponId
	};
	http2.on("success",function(data) {
		if(data.SUCCESS == "000") {
			//如果从服务器中删除成功，就再从couponsListView中将停车券删除
			for(var i = 0;i < couponsDataArr.length;i++) {
				if(couponId == couponsDataArr[i].parkingid) {
					couponsDataArr.splice(i,1);
					couponsListData.removeData([i]);
					couponsListView.refreshItems();
					if(couponsDataArr.length == 1) {
						layoutNone.show();
					}
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
