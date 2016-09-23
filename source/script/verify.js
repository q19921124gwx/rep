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
		var checked = checkedArr[i];
		var str = checked[0];
		var sugg = checked[1].split(":");
		var regName = checked[2];
		if(str === "") {
			nf.toast(sugg[0]);
			return false;
		}
		if(!reg[regName].test(str)) {
			nf.toast(sugg[1]);
			return false;
		}
	}
	return true;
}



