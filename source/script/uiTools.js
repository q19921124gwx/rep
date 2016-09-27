
//对于需要从服务器获取信息的页面，退出的时候将信息存入内存
module.exports.closeMethod = function(memoryName,dataArr,childName,childArr) {
	var deviceone = require("deviceone");
	var do_App = deviceone.sm("do_App");
	var do_Page = deviceone.sm("do_Page");
	var global = deviceone.sm("do_Global");
	var _rootView = deviceone.ui("$");
	//android返回按钮关闭页面;
//	do_Page.on("back", "", 200, function() {
		if(memoryName && dataArr ) {
			global.setMemory(memoryName,dataArr);
			if(childName && childArr) {
				global.setMemory(childName,childArr);
			}
		}
		do_Page.hideKeyboard();
		do_App.closePage();
//	});
	//按钮关闭页面
//	if (closeButton){
//		//防止2秒之内的重复点击
//		closeButton.on("touch", "", 2000, function(data) {
//			do_Page.hideKeyboard();
//			do_App.closePage();
//		});
//	}
	//点击最底层的空白处时，收起键盘
//	_rootView.on("touch", "", 200, function() {
//		do_Page.hideKeyboard();
//	});
};