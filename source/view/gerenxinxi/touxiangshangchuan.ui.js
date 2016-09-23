var do_Page = sm("do_Page");
var do_Album = sm("do_Album");
var nf = sm("do_Notification");
var do_Camera = sm("do_Camera");


//声明UI变量
var ALayout_touxaing = ui("ALayout_touxaing");
var do_Button_xiangji = ui("do_Button_xiangji");
var do_Button_xiangce = ui("do_Button_xiangce");

do_Button_xiangji.on("touch",function(){
	do_Camera.capture(200, 200, 100, true, function(data) {
		do_Album.save({
			path : "source://image/gerenxinxi/portrait.png",
		});
		// width : -1 代表以height为基准 (保持原图横纵比)缩放;
		do_Page.fire("touxiang", data);
		ALayout_touxaing.visible = false;
	})		
});


do_Button_xiangce.on("touch",function(){
	do_Album.select(1, 200, 200, 100, true, function(data, e) {
		do_Album.save({
			path : "source://image/gerenxinxi/portrait.png",
		});
		do_Page.fire("touxiang", data[0]);
		ALayout_touxaing.visible = false;
	})
});




	

//初始时要隐藏
ALayout_touxaing.visible = false;
//点击其它区域，则隐藏关闭当前View
ALayout_touxaing.on("touch", function(){
	ALayout_touxaing.visible = false;
});