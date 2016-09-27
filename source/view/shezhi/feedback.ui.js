/**
 * related to feedback.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-05
 */
var page = sm("do_Page");
var app = sm("do_App");
var submit = ui("layoutSubmit");
var nf = sm("do_Notification");
var content = ui("textboxContent");

page.on("back",function() {
	app.closePage();
});
ui("back").on("touch",function() {
	page.fire("back");
});



submit.on("touch",function() {
	if(content.text.length > 0) {
		nf.alert("提交成功，感谢您的反馈");
	}
	else{
		nf.alert("反馈建议不能为空");
	} 
});