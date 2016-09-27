var nf = sm("do_Notification");
var app = sm("do_App");
var do_Global =sm("do_Global");
var page =sm("do_Page");

//声明UI组件
var do_ListView_2 = ui("do_ListView_2")

////3.专有同步方法
var dataS = mm("do_ListData");//listview显示数据需要do_listdata配合使用，也需要在cell1.ui.js和cell2.ui.js里添加相应的代码
do_ListView_2.bindItems( dataS );//listview和数据源bind
var datas = do_Global.getMemory("marka");
dataS.addData(datas);//数据源添加数据
do_ListView_2.refreshItems();//listview刷新界面，显示数据

//返回按钮的返回事件

// 监听android 的返回按钮;
page.on("back",function() {
	app.closePage();
});
ui("back").on("touch",function() {
	page.fire("back");
});