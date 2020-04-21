btn1.onclick = function (){
	window.location.href = "task7.html";
}
btn3.onclick = function (){
	var input = document.getElementById("killer");
	var re = /^[0-9]+/;
	var killer = input.value;
	if(re.test(killer) && killer>3 && killer<19){
	//alert("right")
		var arr = new Array ();//人员配比
		var arr1 = new Array();//身份
		arr = peibi(killer);
		console.log(arr);
		arr1 = fuzhi(arr , killer);
		console.log(arr1);
		suiji(arr1);
		console.log(arr1);
		show(arr);
	//window.location.href = "turnover.html";
	}
	else{
		alert("请输入4-18之间的数字")
		input.value = "";
	}
}
//回车点击btn3
document.onkeydown = function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if (e && e.keyCode==13) {
		btn3.onclick ();
	}
}
//给数组赋值长度为killer
function fuzhi(arr , killer) {
	var arr1 = new Array();
	for (var i = 0; i < killer; i++) {
		if (i<arr[1]) {arr1[i]=0;}
		else {arr1[i]=1;}
	}
	return arr1;
}
//随机打乱arr数组
function suiji(arr) {
	var temp,j;
	var len = arr.length-1;
	for (var i = len; len > 0; i--) {
		j = parseInt(Math.random()*len) ;
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
		len --;
	}
}
//人员配比
function peibi(killer) {
	var arr = new Array();
	arr[0] = parseInt(killer/4);
	arr[1] = killer - arr[0];
	return arr;
}
//动态显示人员配比
function show(arr) {
		killer0.innerText=arr[0];
		killer0.style.color = "orange";
		killer1.innerText=arr[1];
		killer1.style.color = "orange";
}