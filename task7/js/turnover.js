btn1.onclick = function (){
	window.location.href = "seting.html";
}
function getsession(arr,arr1) {
	var temp = sessionStorage.arr;
	var arr = JSON.parse(temp);
	console.log(arr);
	temp = sessionStorage.arr1;
	var arr1 = JSON.parse(temp)
	console.log(arr1);
	return [arr,arr1];
}

window.onload = function (){
	var fanhui = getsession(arr,arr1);
	var arr = fanhui[0];
	var arr1 = fanhui[1];
	var i=0;
	document.getElementById('btn').addEventListener("click",function () {
		//显示和隐藏按钮
		if(i<arr1.length-1){
			display();
		}else{
			display();
			toggleDisplayStatus(btn0);
			toggleDisplayStatus(check);
		}
		//显示身份
		if(arr1[i]===1){
			document.getElementById('idcard').innerHTML = "杀手";
		}else{
			document.getElementById('idcard').innerHTML = "平民";
		}
	});
	document.getElementById('btn0').addEventListener("click",function () {
		display();
		No.innerHTML = i+2 ;
		bianhao.innerHTML = i+2;
		bianhao0.innerHTML = i+2;
		i++;
	});

}

function display(){
	var idcard = document.getElementById('idcard');
	toggleDisplayStatus(idcard);
	var image = document.getElementById('image');
	toggleDisplayStatus(image);
	var image0 = document.getElementById('image0');
	toggleDisplayStatus(image0);
	var btn = document.getElementById('btn');
	toggleDisplayStatus(btn);
	var btn0 = document.getElementById('btn0');
	toggleDisplayStatus(btn0);
}
var toggleDisplayStatus =function (oDiv){
	//var oDiv = document.getElementById("div1");
	var aDisplay = window.getComputedStyle (oDiv,null)["display"];
	if("none" == aDisplay){
		oDiv.style.display = "block";
	}else{
		oDiv.style.display = "none";
	}
}
