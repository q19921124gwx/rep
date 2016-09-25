/**********************************************
 * Author : @Author
 * Timestamp : @Timestamp
 **********************************************/
var nf = sm("do_Notification");
var do_App = sm("do_App");
var do_Storage = sm("do_Storage");
var do_Global =sm("do_Global");
var do_Page =sm("do_Page");
var do_BaiduLocation=sm("do_BaiduLocation");
var do_BaiduNavigate = sm("do_BaiduNavigate");

//声明UI组件
var do_BaiduMapView_1 = ui("do_BaiduMapView_1");
var do_ALayout_dingwei = ui("do_ALayout_dingwei");
var do_Button_fangda = ui("do_Button_fangda");
var do_Button_suoxiao = ui("do_Button_suoxiao");
var do_Label_TingCCName = ui("do_Label_TingCCName");
var do_Label_TCCName = ui("do_Label_TingCCName");
var do_Label_JuLi = ui("do_Label_JuLi");
var do_ALayout_indaohang = ui("do_ALayout_indaohang");
var do_ALayout_xiangqing = ui("do_ALayout_xiangqing");
var do_ALayout_root = ui("do_ALayout_root");
var do_ALayout_gerenxinxi = ui("do_ALayout_gerenxinxi");
var do_ALayout_LB = ui("do_ALayout_LB");
var state;
//引入自定义的js库
var index_js = require("index_js");
var xinxiFlag;
//自定义变量
var DYCDingwei = true;
var iddingwei;//对定位的坐标进行标记的变量
var dingweizuobiao = "";//定位坐标
var zhongdian = ""; //导航终点坐标

//在do_ALayout_root上动态添加子视图(该视图初始化的脚本会将自身先隐藏)
do_ALayout_root.add("XinXiLe", "source://view/xinxi.ui", 0, 0);
var XinXiLe = ui("XinXiLe");




//返回按钮的返回事件

//导航点击事件
do_ALayout_indaohang.on("touch", function() {
	do_BaiduNavigate.start(dingweizuobiao, zhongdian);
});

//按钮定位 ,2秒内只能定位一次
var candingwei = true;
var dingshiqi =mm("do_Timer");
dingshiqi.delay = 2000;
dingshiqi.on("tick", function() {
	dingshiqi.stop();
	candingwei = true;
});
do_ALayout_dingwei.on("touch",function() {
	if(candingwei){
		candingwei = false;
		dingshiqi.start();
		do_BaiduMapView_1.removeAll();
		do_BaiduMapView_1.zoomLevel = 17 ;
		do_BaiduLocation.start("high",true);
		}
});


//初始化定位
do_BaiduLocation.start("high",true);
//收到定位信息触发事件
do_BaiduLocation.on("result", function(data, e) {
	do_BaiduLocation.stop({});
	//nf.toast(do_BaiduMapView_1.get(Center));
	//把当前位置设置为地图中心点
	do_BaiduMapView_1.setCenter({
		latitude : data.latitude,
		longitude : data.longitude
	});
	//定位坐标赋值
	dingweizuobiao = data.latitude+","+data.longitude; 
	do_Global.setMemory("dingweizuobiao", dingweizuobiao);
	iddingwei = [{"id":"iddingwei","latitude":data.latitude,"longitude":data.longitude,"url":"source://image/mark.png","info":data.address}];
    //标记当前位置
	do_BaiduMapView_1.addMarkers(iddingwei);
	var param1 = data.latitude+","+data.longitude;
	//根据当前位置搜索1公里半径内的停车场
	do_BaiduMapView_1.poiSearch ({type:2, keyword:"停车场", param:{location:param1,radius:'10000'}, pageIndex:1, pageSize:20}, function(data, e) {
		var marka = index_js.BiaoJiShuZu(data);
		do_Global.setMemory("marka", data);
		//id为0是直线距离最近的，设为默认选中
		zhongdian = marka[0].latitude+","+marka[0].longitude;
		do_Global.setMemory("zhongdian", zhongdian);
		do_Global.setMemory("text", marka[0].info);
		do_Label_TingCCName.text = marka[0].info;
		do_Label_TCCName.text = marka[0].info;
		do_Label_JuLi.text = do_BaiduMapView_1.getDistance(dingweizuobiao, marka[0].latitude+","+marka[0].longitude).toFixed()+"米";
		marka[0].url="source://image/close_fangda.png";
		datayixiugai=marka[0];
		//对搜索出来的位置进行标记
		do_BaiduMapView_1.addMarkers({
			data : marka
		});
	})
});

var config = require("config");
//地图放大
do_Button_fangda.on("touch", function(data, e) {
	var b = do_BaiduMapView_1.zoomLevel + 1;
	if (b > 20) {
		b = 20;
	}
	do_BaiduMapView_1.zoomLevel = b;
});
//地图缩小
do_Button_suoxiao.on("touch", function(data, e) {
	var a = do_BaiduMapView_1.zoomLevel - 1;
	if (a < 3) {
		a = 3;
	}
	do_BaiduMapView_1.zoomLevel = a;
});

//打开停车场详情页面
do_ALayout_xiangqing.on("touch", function() {
	do_App.openPage({
		source:"source://view/TCCXiangQing/main.ui",
		animationType:"push_r21"
	});
})

//打开停车场列表
do_ALayout_LB.on("touch", function() {
	do_App.openPage({
		source:"source://view/liebiao/liebiao.ui",
		animationType:"push_r21"
	});
})

//当前页面下，订阅Android系统返回键的事件：3秒内连续点击两次退出应用
var canBack = false;
var delay3 =mm("do_Timer");
delay3.delay = 3000;
delay3.on("tick", function() {
	delay3.stop();
	canBack = false;
});

do_Page.on("back", function() {
	if(!xinxiFlag) {
		if(canBack){
			do_Global.exit();
		} else{
			nf.toast("再次点击退出应用");
			canBack = true;
			delay3.start();
		  }
	}
	xinxiFlag = false;
});

//点击标记触发该事件
//datayixiugai存储已久修改过标记图片的坐标信息
var datayixiugai="";
do_BaiduMapView_1.on("touchMarker",function(data, e){
	if(data.id != "iddingwei"&&data.id!=datayixiugai.id){
		zhongdian = data.latitude+","+data.longitude;
		do_Global.setMemory("zhongdian", zhongdian);
		do_Global.setMemory("text", data.info);
	    do_Label_TingCCName.text = data.info;
	    do_Label_TCCName.text = data.info;
	    do_Label_JuLi.text = do_BaiduMapView_1.getDistance(dingweizuobiao, zhongdian).toFixed()+"米";
	    data.url="source://image/close_fangda.png";
	    if(datayixiugai == ""){
	    	do_BaiduMapView_1.removeMarker({ids:[data.id]});
	        do_BaiduMapView_1.addMarkers([data]);
	    }
	    else{
	    	datayixiugai.url="source://image/close.png";
	    	do_BaiduMapView_1.removeMarker({ids:[data.id,datayixiugai.id]});
	        do_BaiduMapView_1.addMarkers([data,datayixiugai]);
	    }
	    datayixiugai=data;
	}
});

do_Page.on("result",function(data) {
	if(data == "0") {
		state ="0";
		XinXiLe.hide();
	}
	if(data == "1") {
		state = "1";
		do_Page.fire("newUser");
	}
});


do_Page.on("loaded",function() {
	state = do_Page.getData();
});

do_ALayout_gerenxinxi.on("touch", function() {
	xinxiFlag = true;
	if(state == "1") {
		XinXiLe.show("slide_l2r", 300);
	}
	else 
	{
		do_App.openPage({
			source : "source://view/logIn.ui"
		});
	}
});

