/**
 * related to aboutus.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-09-05
 */
var page = sm("do_Page");
var app = sm("do_App");
var External = sm("do_External");
var contact = ui("layoutContact");

page.on("back",function() {
	app.closePage();
});
ui("back").on("touch",function() {
	page.fire("back");
});

contact.on("touch", function(data, e){
	External.openDial(ui("labelPhoneNum").text);
});

