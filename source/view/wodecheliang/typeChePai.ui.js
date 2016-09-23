/**
 * related to typeChePai.ui
 * 
 * @Author : q19921124g
 * @Timestamp : 2016-08-31
 */
var carNum = "";
var nf = sm("do_Notification");
var global = sm("do_Global");
var flag = true;
var labelGrid = ui("labelGrid");
var num = 0;
var app = sm("do_App");
var page = sm("do_Page");
var gridView = ui("gridView");
//var deletLayout = ui("deleteLayout");
var sure   = ui("sure");
var char = "";
//各个girdView的单元格的listData要用到的的数组
var labeldata = [
    {
    	text : "",
    	id : "1",
    	color : "000000FF"
    },             
    {
    	text : "",
    	id : "2",
    	color : "3EC4F0FF"
    },             
    {
    	text : "",
    	id : "3",
    	color : "3EC4F0FF"
    },             
    {
    	text : "",
    	id : "4",
    	color : "3EC4F0FF"
    },             
    {
    	text : "",
    	id : "5",
    	color : "3EC4F0FF"
    },             
    {
    	text : "",
    	id : "6",
    	color : "3EC4F0FF"
    },             
    {
    	text : "",
    	id : "7",
    	color : "3EC4F0FF"
    }             
                 ];
var datas = [
    {text : "京",
       id : "1"},
    {text : "津",
       id : "2"},
    {
       text : "沪",
       id : "3"},
    {text : "渝",
       id : "4"},
       {
    	   text : "翼",
    	   id : "5"
       },
       {
    	   text : "豫",
    	   id : "6"
       },
       {
    	   text : "云",
    	   id : "7"
       },
       {
    	   text : "辽",
    	   id : "8"
       },
       {
    	   text : "黑",
    	   id : "9"
       },
       {
    	   text : "湘",
    	   id : "10"
       },
       {
    	   text : "皖",
    	   id : "11"
       },
       {
    	   text : "鲁",
    	   id : "12"
       },
       {
    	   text : "新",
    	   id : "13"
       },
       {
    	   text : "苏",
    	   id : "14"
       },
       {
    	   text : "浙",
    	   id : "15"
       },
       {
    	   text : "赣",
    	   id : "16"
       },
       {
    	   text : "桂",
    	   id : "17"
       },
       {
    	   text : "甘",
    	   id : "18"
       },
       {
    	   text : "晋",
    	   id : "19"
       },
       {
    	   text : "蒙",
    	   id : "20"
       },
       {
    	   text : "陕",
    	   id : "21"
       },
       {
    	   text : "吉",
    	   id : "22"
       },
       {
    	   text : "闽",
    	   id : "23"
       },
       {
    	   text : "粤",
    	   id : "24"
       },
       {
    	   text : "青",
    	   id : "25"
       },
       {
    	   text : "藏",
    	   id : "26"
       },
       {
    	   text : "琼",
    	   id : "27"
       },
       {
    	   text : "川",
    	   id : "28"
       },
       {
    	   text : "贵",
    	   id : "29"
       },
       {
    	   text : "鄂",
    	   id : "30"
       },
       {
    	   text : "宁",
    	   id : "30"
       }
];
var letters = [
   {text : "A"},            
   {text : "B"},            
   {text : "C"},            
   {text : "D"},            
   {text : "E"},            
   {text : "F"},            
   {text : "G"},            
   {text : "H"},            
   {text : "I"},            
   {text : "J"},            
   {text : "K"},            
   {text : "L"},            
   {text : "M"},            
   {text : "N"},            
   {text : "O"},            
   {text : "P"},            
   {text : "Q"},            
   {text : "R"},            
   {text : "S"},            
   {text : "T"},            
   {text : "U"},            
   {text : "V"},            
   {text : "W"},            
   {text : "X"},            
   {text : "Y"},            
   {text : "Z"}            
];
var letAndNum = [
   {text : "A"},            
   {text : "B"},            
   {text : "C"},            
   {text : "D"},            
   {text : "E"},            
   {text : "F"},            
   {text : "G"},            
   {text : "H"},            
   {text : "I"},            
   {text : "J"},            
   {text : "K"},            
   {text : "L"},            
   {text : "M"},            
   {text : "N"},            
   {text : "O"},            
   {text : "P"},            
   {text : "Q"},            
   {text : "R"},            
   {text : "S"},            
   {text : "T"},            
   {text : "U"},            
   {text : "V"},            
   {text : "W"},            
   {text : "X"},            
   {text : "Y"},            
   {text : "Z"},
   {text : "0"},
   {text : "1"},
   {text : "2"},
   {text : "3"},
   {text : "4"},
   {text : "5"},
   {text : "6"},
   {text : "7"},
   {text : "8"},
   {text : "9"}
];
var letAndNum1 = [
   {text : "A"},            
   {text : "B"},            
   {text : "C"},            
   {text : "D"},            
   {text : "E"},            
   {text : "F"},            
   {text : "G"},            
   {text : "H"},            
   {text : "I"},            
   {text : "J"},            
   {text : "K"},            
   {text : "L"},            
   {text : "M"},            
   {text : "N"},            
   {text : "O"},            
   {text : "P"},            
   {text : "Q"},            
   {text : "R"},            
   {text : "S"},            
   {text : "T"},            
   {text : "U"},            
   {text : "V"},            
   {text : "W"},            
   {text : "X"},            
   {text : "Y"},            
   {text : "Z"},
   {text : "0"},
   {text : "1"},
   {text : "2"},
   {text : "3"},
   {text : "4"},
   {text : "5"},
   {text : "6"},
   {text : "7"},
   {text : "8"},
   {text : "9"},	
   {text : "警"},	
   {text : "学"}	
];
var listData = mm("do_ListData");
listData.addData(datas);
var labellistData = mm("do_ListData");
labellistData.addData(labeldata);

page.on("back",function() {
	app.closePage();
});


page.on("loaded",function() {
	//num=1:载入后设置要输入的那位为第一位,绑定上排7个输入框和下面的输入选项的listData
	global.setMemory("num","1");
	gridView.bindItems(listData);
	labelGrid.bindItems(labellistData);
});

page.on("refresh",function(num) {
	//用于在要输入的位num改变之后更换输入的选项(车牌号的不同位数输入的选项是不同的)
	if(num > 1 && num < 6) {
		changeGridItem(letAndNum);
	}
	else {
		if(num == 0) {
			changeGridItem(datas);
		}
		if(num == 1) {
			changeGridItem(letters);
		}
		if(num == 6) {
			changeGridItem(letAndNum1);
		}
	}
});

page.on("typeLabelRefresh",function(id) {
	//用于刷新上面的7个输入框的颜色和里面的文本,当前要输入的颜色为黑色，其余为蓝色
	labellistData.removeAll();
	for(var a = 0;a < 7;a++) {
			labeldata[a].color = "3EC4F0FF";
			if(labeldata[a].id == id) {
				labeldata[a].text = global.getMemory("text1");
			}
	}
	for(var b = 1;b < 7;b++) {
		if(labeldata[b-1].id == id) {
			labeldata[b].color = "000000FF";
		}
	}
	if(id == "7") {
		labeldata[6].color = "000000FF";
	}
	labellistData.addData(labeldata);
	labelGrid.refreshItems();
});

//在点击删除的图标时，触发该函数
//deletLayout.on("touch",function() {
//	num = parseInt(global.getMemory("num"));
//	if(labeldata[num - 1].text != "") {
//		labeldata[num - 1].text = "";
//	}
//	else{
//		labellistData.removeAll();
//			for(var c = 0;c < 7;c++) {
//				if(c + 2 == num) {
//					labeldata[c].text = "";
//					labeldata[c].color = "000000FF";
//				}
//				else {
//					labeldata[c].color = "3EC4F0FF";
//				}
//			}
////		}
//		if(num != "1") {
//			global.setMemory("num",num - 1);
//			page.fire("refresh",num - 2);
//		}
//		else {
//			page.fire("choose",1);
//			page.fire("refresh",0);
//		}
//		
//	}
//	labellistData.removeAll();
//	labellistData.addData(labeldata);
//	labelGrid.refreshItems();
//});

//改变下面选项的gridView所绑定的listData的数据源data，并重新绑定，在要输入的位数发生变化的时候调用
function changeGridItem(data) {
	listData.removeAll();
	listData.addData(data);
	gridView.refreshItems();
}

//在用手触摸要输入的那个位的时候触发，将该位所对应的外边框的颜色变为黑色，并将要输入的位改为所选择的那个位置
page.on("choose",function(id) {
	page.fire("refresh",parseInt(id) - 1);
	global.setMemory("num",id);
	for(var e = 0;e < 7;e++) {
		labeldata[e].color = "3EC4F0FF";
	}
	labeldata[parseInt(id) - 1].color = "000000FF";
	labellistData.removeAll();
	labellistData.addData(labeldata);
	labelGrid.refreshItems();
});

//点击确认，判断车牌号的各个位都是否为空，如果都不为空，就关闭当前页，将车牌号传到下层页面处理
sure.on("touch",function() {
	for(var f = 0;f < 7;f++) {
		char = labeldata[f].text;
		if(labeldata[f].text == "") {
			//只要有一个位是空的，flag为false不运行关闭页面创建车牌的部分
			flag = false;
			carNum = "";
			break;
		}
		else {
			carNum += char;
		}
	}
	if(flag) {
		app.closePage(carNum);
	}
	flag = true;
});


