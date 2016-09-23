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

var uiTools = require("uiTools");
uiTools.closeMethod(ui("back"));

contact.on("touch", function(data, e){
	External.openDial(ui("labelPhoneNum").text);
});

