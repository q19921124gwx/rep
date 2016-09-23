//声明UI变量
var do_Page = sm("do_Page");
var ALayout_nianling = ui("ALayout_nianling");
var do_Picker_nianling = ui("do_Picker_nianling");

//初始时要隐藏
ALayout_nianling.visible = false;
//点击其它区域，则隐藏关闭当前View
ALayout_nianling.on("touch", function(){
	ALayout_nianling.visible = false;
});

//绑定数据
var listdata = mm("do_ListData");
listdata.addData([ 
"90后",
"80后",
"70后",
"60后"
]);
do_Picker_nianling.bindItems(listdata);
//默认选择第1条记录
do_Picker_nianling.index=0;


//类型值变化
do_Picker_nianling.on("selectChanged", function(index) {
	//在当前页面下发送nianling自定义消息
	do_Page.fire("nianling", listdata.getOne(index));	
});
