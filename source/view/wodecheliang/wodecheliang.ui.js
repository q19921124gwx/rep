var config = require("config");
var nf = sm("do_Notification");
var do_App = sm("do_App");
var do_Page =sm("do_Page");
var carListView = ui("carListView");
var addACarLayout = ui("layoutAddACar");
var carAmount = 0;
var global = sm("do_Global");
var carListDataArr;
var carListCellData = mm("do_ListData");
carListView.bindItems(carListCellData);
var config = require("config");
var uiTools = require("uiTools");
do_Page.on("back",function() {
	uiTools.closeMethod("myCarsMemory",carListDataArr);
});

ui("back").on("touch",function() {
	do_Page.fire("back");
});
//do_Page.on("back", function() {
//		//返回时将当前的最新数据存入内存，以便再次进入界面时直接获取
//		global.setMemory("myCarsMemory",carListDataArr);
//		do_App.closePage();
//});

do_Page.on("loaded",function() {
	//载入时先从内存读取车辆信息
	carListDataArr = global.getMemory("myCarsMemory");
	//如果将车牌号全部删除之后再次进入，JSON.stringify(carListDataArr) == "[{}]"，
	//会出现一个没有车牌号的carListView的Cell
	if(JSON.stringify(carListDataArr) == "[{}]") {
		
	}
	else {
		//carListDataArr == "" 表明第一次进入，需要从服务器读取数据
		if(carListDataArr == "") {
			getCarDataOnLoaded();
		}
		//表明不是第一次进入，且没有删除所有的车牌号，可以从内存读取车牌号信息
		else {
			carAmount = carListDataArr.length;
			carListCellData.addData(carListDataArr);
			carListView.refreshItems();
		}
	}
});

function getCarDataOnLoaded() {
	//先把字符串定义为一个空数组，避免下面addData的时候报错
	carListDataArr = [{}];
	var http = mm("do_Http");
	http.timeout = 30000;
	http.method = "post";
	http.url = config.ip + "/getcars";
	http.contentType = "application/json";
	http.body = {
		"userid" : global.getMemory("userId")	
	};
	http.on("success",function(data) {
		if(data != null && data.data != null) {
			if(data.SUCCESS == 003) {
				//如果保存车辆数据的数组没有元素，carListDataArr已经为[{}];不用做任何操作
			}
			//如果保存车辆数据的数组本来有元素，就将其从服务器获取后后显示在下面的carListView中
			else {
				if(data.SUCCESS == 000){
					carListDataArr = data.data;
					carAmount = carListDataArr.length;
					carListCellData.removeAll();
					carListCellData.addData(carListDataArr);
					carListView.refreshItems();
				}
				else {
					nf.toast("网络异常，请您稍后重试");
				}
			}
		}
	});
	http.on("fail",function(data) {
		//如果失败，将carListDataArr赋值为”“，防止下次进入时判定为已经成功获取了数据库的数据
		carListDataArr = "";
		nf.toast("网络异常，请您稍后重试");
	});
	http.request();
}

addACarLayout.on("touch",function(){
	if(carAmount == 3) {
		nf.toast("最多可以添加三辆汽车");
	}
	else{
		//进入输入车牌号的页面
		do_App.openPage({
			source : "source://view/wodecheliang/typeChePai.ui",
			animationType : "push_r2l",
		});
	}
});

do_Page.on("result",function(CarNum) {
	//如果字符串长度不等于7(也就是在typechepai.ui界面点击了返回)，在输入车牌号界面返回时不会添加车辆
		if(CarNum.length == 7) {
			//判断车牌号是否重复 (通过将车牌号信息的数组(含车牌号)变成字符串，
			//判断从前面关闭的typechepai.ui页面传入的车牌号是否是该数组转化成的字符串重复，
			if(JSON.stringify(carListDataArr).indexOf(CarNum) == -1) {
				//在服务器中增加车辆
				var http3 = mm("do_Http");
				http3.method = "post";
				http3.timeout = 30000;
				http3.contentType = "application/json";
				http3.url = config.ip + "/setcars";
				http3.body =  {
						"carnum" : CarNum,
						"userid" : global.getMemory("userId")
				};
				
				http3.on("success",function(data) {
					if(data.SUCCESS == 000) {
						//添加车辆后把车辆的信息(即删除车辆时需要用到的carid)添加到carListData中，
						//确保点击删除的时候可以将carid传回。
						carAmount++;
						var http4 = mm("do_Http");
						http4.timeout = 30000;
						http4.method = "post";
						http4.url = config.ip + "/getcars";
						http4.contentType = "application/json";
						http4.body = {
							"userid" : global.getMemory("userId")	
						};
						http4.on("success",function(data) {
							if(data.SUCCESS == 000) {
								var carsDataArr = data.data;
								carData = carsDataArr[carsDataArr.length - 1];
								carListDataArr[carAmount - 1] = carData;
								carListCellData.addOne(carData);
								carListView.refreshItems();
							}
						});
						http4.request();
					}
					else {
						nf.toast("网络异常，请您稍后重试");
					}
				});
				
				http3.request();
			}	
		}
});

do_Page.on("deleteACar",function(data) {
	var carid = data;
	var http2 = mm("do_Http");
	http2.method = "post";
	http2.timeout = 30000;
	http2.url = config.ip + "/detcars";
	http2.contentType = "application/json";
	http2.body = {
		"carid" : carid
	};
	http2.on("success",function(data) {
		if(data.SUCCESS == 000) {
			//如果从服务器中删除成功，就再从carListView中将车辆删除
			for(var i = 0;i < carAmount;i++) {
				if(carid == carListDataArr[i].carid) {
					carListDataArr.splice(i,1);
					carListCellData.removeData([i]);
					carListView.refreshItems();
					break;
				}
			}
			carAmount--;
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

//do_Page.on("deleteACar",function(data) {
//	var carnumber = global.getMemory("carnumber");
//	var http2 = mm("do_Http");
//	http2.method = "post";
//	http2.timeout = 30000;
//	http2.url = config.ip + "/detcars";
//	http2.contentType = "application/json";
//	http2.body = {
//		"carid" : data
//	};
//	http2.on("success",function(data) {
//		if(data.SUCCESS == 000) {
//			//如果从服务器中删除成功，就再从carListView中将车辆删除
//			for(var i = 0;i < carAmount;i++) {
//				if(carnumber == carListDataArr[i].carnum) {
//					carListDataArr.splice(i,1);
//					carListCellData.removeData([i]);
//					carListView.refreshItems();
//					break;
//				}
//			}
//			carAmount--;
//		}
//		else {
//			nf.toast("网络异常，请您稍后重试");
//		}
//	});
//	http2.on("fail",function(data) {
//		nf.toast("网络异常，请您稍后重试");
//	});
//	http2.request();
//});