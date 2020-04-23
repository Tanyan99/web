//display();

btn1.onclick = function (){
	window.location.href = "task7.html";
}

btn3.onclick = function (){

	//创建人员配比arr数组:0-killer,1-杀手,2-平民
	var arr = createArr();
	console.log(arr);
	if(arr === 0){//创建失败
		alert("请输入4-18之间的数字")
		console.log("false!");
		document.getElementById("killer").value = "";
		return "flase";
	}
	else{show(arr);}

	//创建身份arr:0-平民;1-杀手
	var arr1 = createArr1(arr);
	console.log(arr1);

	//将人员配比arr、身份arr1存储到浏览器
	var temp = JSON.stringify(arr)
	window.sessionStorage.arr = temp ;
	temp = JSON.stringify(arr1)
	window.sessionStorage.arr1 = temp ;

	//window.location.href = "turnover.html";
	
}

//回车点击btn3
document.onkeydown = function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if (e && e.keyCode==13) {
		btn3.onclick ();
	}
}




/*函数声明👇*/

//创建身份arr1:0-平民;1-杀手
function createArr1(arr){
	var arr1 = new Array();
	//给数组赋值长度为k
	(function (arr,arr1) {
		for (var i = 0; i < arr[0]; i++) {
			if (i<arr[1]) {arr1[i]=1;}
			else {arr1[i]=0;}
		}
	})(arr,arr1);
	//随机打乱数组
	(function suiji(arr) {
		var len = arr.length-1;
		for (var i = len,j,temp; len > 0; i--) {
			j = parseInt(Math.random()*len) ;
			temp = arr[j];
			arr[j] = arr[i];
			arr[i] = temp;
			len --;
		}
	})(arr1);
	return arr1;
}
//创建人员配比arr数组:0-killer,1-杀手,2-平民
function createArr(){
	var killer = duqu();
	var re = /^[0-9]+/;
	if(re.test(killer) && killer>3 && killer<19){
		var arr = new Array();
		peibi(arr,killer);
		return arr;
	}
	else {return 0;}
}
function duqu() {
		var killer = document.getElementById("killer").value-0;
		console.log(killer);
		return killer;
	}
function peibi(arr,killer) {
			arr[0] = killer;
			arr[1] = parseInt(killer/4);
			arr[2] = killer - arr[1];
		}
function show(arr) {
		killer0.innerText=arr[1];
		killer0.style.color = "orange";
		killer1.innerText=arr[2];
		killer1.style.color = "orange";
}

//实时显示人员配比
/*function display() {
	setInterval(function () {
		var arr = createArr();
		var arr0 = ['0','0','0'];
		if(arr !== 0){
			show(arr);
		}
		else{show(arr0);}
	}, 500 );
}*/

window.onload = function dragSlide() {
	var lineDiv = document.getElementById('bgbar'); //长线条          
	var minDiv = document.getElementById('btn'); //小方块
	var btndown = document.getElementById('down');//减1功能键
	var btnup = document.getElementById('up');//加1功能键
	var width = parseInt(minDiv.offsetWidth); 
	//小方块的宽度  	
	var lineDiv0 = document.getElementById('pgbar');
	//var msg = document.getElementById("msg");
	var vals;

	 //= document.getElementById("killer");
	var ifBool = false; //判断鼠标是否按下

	var start = function(e) {
		e.stopPropagation();
		ifBool = true;
		console.log("鼠标按下")
	}

	var move = function(e) {
		console.log("鼠标拖动")
		if(ifBool){
			if(!e.touches) {    //兼容移动端
				var x = e.clientX;
			} else {     //兼容PC端
				var x = e.touches[0].pageX;
			}
		}
		//var x = e.touches[0].pageX || e.clientX; //鼠标横坐标var x
		var lineDiv_left = getPosition(lineDiv).left; 
		//长线条的横坐标
		var minDiv_left = x - lineDiv_left;
		//小方块相对于父元素（长线条）的left值
		if(minDiv_left >= lineDiv.offsetWidth - width) {
			minDiv_left = lineDiv.offsetWidth - width;
		}
		if(minDiv_left < 0) {
			minDiv_left = 0;
		}
		//if()
		//设置拖动后小方块的left值
		minDiv.style.left = minDiv_left + "px";
		//拖动过的进度条长度
		lineDiv0.style.width = minDiv.style.left;

		//percent百分比改为如下所示,解决开始和最后滑动的体验不好问题                 
		var percent = (minDiv_left / (lineDiv.offsetWidth - width)) * 14;
		if (percent > 0 && percent < 1) {
			percent = Math.ceil(percent);
		}
		else {
			percent = Math.floor(percent);
		}
		vals = percent+4;
		if(vals){
			document.getElementById('killer').value = vals;
			var arr = new Array();
			peibi(arr , vals);
			show(arr);
		}
	}
	//减1
	var down = function (e) {
		console.log("减1");
		var one = parseInt((lineDiv.offsetWidth-width)/14);//一格的长度
		var minDiv_left = getPosition(minDiv).left - getPosition(lineDiv).left;
		//小方块相对小长条的left值
		minDiv_left -= one;
		var percent = (minDiv_left / (lineDiv.offsetWidth - width)) * 14;
		if (percent > 0 && percent < 0.5) {
			percent = Math.ceil(percent);
		}
		else {
			percent = Math.floor(percent);
		}
		vals = percent+4;
		if(minDiv_left < width/2) {
			minDiv_left = 0;
			vals = 4 ;
		}
		//设置拖动后小方块的left值和拖过的小长条长度
		minDiv.style.left = minDiv_left + "px";
		lineDiv0.style.width = minDiv.style.left;

		document.getElementById('killer').value = vals;
		var arr = new Array();
		peibi(arr , vals);
		show(arr);
	}

	//加1
	var up = function (e) {
		console.log("加1");
		var one = (lineDiv.offsetWidth-width)/14;//一格的长度
		var minDiv_left = getPosition(minDiv).left - getPosition(lineDiv).left;
		//小方块相对小长条的left值
		minDiv_left += one;
		var percent = (minDiv_left / (lineDiv.offsetWidth - width)) * 14;
		if (percent > 0 && percent < 0.5) {
			percent = Math.ceil(percent);
		}
		else {
			percent = Math.floor(percent);
		}
		vals = percent+4;
		if(minDiv_left >= lineDiv.offsetWidth - width) {
			minDiv_left = lineDiv.offsetWidth - width;
			vals = 18;
		}
		//设置拖动后小方块的left值和拖过的小长条长度
		minDiv.style.left = minDiv_left + "px";
		lineDiv0.style.width = minDiv.style.left;

		document.getElementById('killer').value = vals;
		var arr = new Array();
		peibi(arr , vals);
		show(arr);
	}

	var end = function(e) {
		console.log("鼠标弹起")
		ifBool = false;
	}

	//获取元素的绝对位置,工具函数
	function getPosition(node) {
		var left = node.offsetLeft; 
		//获取元素相对于其父元素的left值var left
		var top = node.offsetTop;
		current = node.offsetParent; 
		// 取得元素的offsetParent

		// 一直循环直到根元素　　
		while(current != null) {　　
			left += current.offsetLeft;　　
			top += current.offsetTop;　　
			current = current.offsetParent;　　
		}
		return {
			"left": left,
			"top": top
		};

	}
	//鼠标按下方块
	minDiv.addEventListener("touchstart", start);
	minDiv.addEventListener("mousedown", start);
	//拖动
	window.addEventListener("touchmove", move);
	window.addEventListener("mousemove", move);
	//功能键
	btndown.addEventListener("click",down);
	btnup.addEventListener('click',up);
	//鼠标松开
	window.addEventListener("touchend", end);
	window.addEventListener("mouseup", end);
	
}

//取消移动端手势长按弹出提示框的操作
document.addEventListener('contextmenu', function(e) {
	e.preventDefault();
});