/**
 * New DeviceOne File
 */
//拼出expandableListView子节点的ChildArr，
//
//childArr的格式必须遵循[[{}],[{}],[{}]]所以必须将数组
//从[{},{},{}]转为[[{}],[{}],[{}]]
module.exports.createChildArr = function(groupArr) {
	//trans 表示  \"的转义形式
	var trans = "\\\"";
	var JSONstr = "\"[[{";
	var childArr = [[]];
	var childArrItem = [{}];
	var childArrItemObj = {
			recordid : "",
			userid : "",
			recordcon : ""
	};
	for(var i = 0;i < groupArr.length;i++) {
		var o = 0; 
		for(prop in groupArr[i]) {
			o++;
			JSONstr += trans + prop + trans + ":" + trans + eval("groupArr[i]." + prop.toString()) + "\\\"";
			
			if(o == 3) {
				if(i == groupArr.length - 1) {
					JSONstr += "}]]\"";
				}
				//"}],"的转义
				else {
					JSONstr += "}],[{";
				}
			}
			else {
				JSONstr += ",";
			}
		}
	}
	return (JSON.parse(JSON.parse(JSONstr)));
}