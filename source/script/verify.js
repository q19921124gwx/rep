/**
 * New DeviceOne File
 */
var deviceone = require("deviceone");
var nf = deviceone.sm("do_Notification");
var reg = {
	tel : /^(\+86)?1\d{10}$/,
	pswd : /^.{6,12}$/
};

module.exports.verify = function(checkedArr) {
	var flag = true;
	for(var i = 0;i < checkedArr.length;i++) {
		//从数组里面获取一个元素
		var checked = checkedArr[i];
		//Label中的text
		var str = checked[0];
		//提示
		var sugg = checked[1].split(":");
		//正则表达式的名称
		var regName = checked[2];
		//函数中的变量str为空的提示
		if(str === "") {
			nf.toast(sugg[0]);
			return false;
		}
		//函数中的变量str不符合正则表达式的提示
		//reg是存放正则表达式的数组
		if(!reg[regName].test(str)) {
			nf.toast(sugg[1]);
			return false;
		}
	}
	//不为空且符合正则表达式，返回true
	return true;
}



