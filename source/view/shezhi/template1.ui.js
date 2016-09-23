/**
 * related to template.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-04
 */
var root = ui("$");
var layout = ui("layout");
var app = sm("do_App");
root.setMapping({
	"label.text" : "text",
	"layout.tag" : "source"
});

layout.on("touch",function() {
	app.openPage({
		source : "source://view/shezhi/" + layout.tag,
		animationType : "fade"
	});
});

