//声明UI变量
var do_Page = sm("do_Page");
var ALayout_xingbie = ui("ALayout_xingbie");
var do_Picker_xingbie = ui("do_Picker_xingbie");

//初始时要隐藏
ALayout_xingbie.visible = false;
//点击其它区域，则隐藏关闭当前View
ALayout_xingbie.on("touch", function(){
	ALayout_xingbie.visible = false;
});

//绑定数据
var listdata = mm("do_ListData");
listdata.addData([ 
"男",
"女"
]);
do_Picker_xingbie.bindItems(listdata);
//默认选择第1条记录
do_Picker_xingbie.index=0;


//类型值变化
do_Picker_xingbie.on("selectChanged", function(index) {
	//在当前页面下发送TypeChanged自定义消息
	do_Page.fire("TypeChanged", listdata.getOne(index));	
});
