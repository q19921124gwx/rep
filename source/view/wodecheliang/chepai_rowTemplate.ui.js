/**
 * related to chepai_row.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-08-31
 */
var root = ui("$");
var nf = sm("do_Notification");
var layoutDelete = ui("layoutDelete");
var page = sm("do_Page");
var carLabel = ui("carLabel");
var global = sm("do_Global");
root.setMapping({
	"carLabel.text":"carnum",
	"carLabel.tag" : "carid"
});

layoutDelete.on("touch",function() {
	nf.confirm("你真的要删除这辆汽车吗", "确认删除", function(data) {
		if(data == 1) {
			//在删除车牌的时候，需要在httpBody中传入carid
			page.fire("deleteACar",carLabel.tag);
		}
	});
});



