var do_App = sm("do_App");
var do_Page =sm("do_Page");
var listView = ui("listView");
//声明UI组件
var data = [
	{
		"text" : "消息提醒",
		"template" : "0",
	},
	{
		"text" : "自动支付",
		"template" : "0",
	},        
    {
    	"text" : "反馈与建议",
    	"template" : "1",
    	"source" : "feedback.ui"
    },
    {
    	"text" : "关于我们",
    	"template" : "1",
    	"source" : "aboutus.ui"
    },
    {
    	"text" : "离线地图",
    	"template" : "1",
    	"source" : "map.ui"
    },
    {
    	"text" : "分享给好友",
    	"template" : "1",
    	"source" : "fenxiang.ui"
    },
    {
    	"text" : "检查更新",
    	"template" : "2"
     },
     {
    	 "text" : "退出登录",
    	 "template" : "3"
     }
];
var list = mm("do_ListData");
list.addData(data);
listView.bindItems(list);

//返回按钮的返回事件

// 监听android 的返回按钮;
var uiTools = require("uiTools");
uiTools.closeMethod(ui("back"));