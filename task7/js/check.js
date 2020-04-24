
btn1.onclick = function (){
window.location.href = "turnover.html";
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
window.onload = function(){
	var temp = getsession(arr,arr1);
	var arr = temp[0];
	var arr1 = temp[1];
	//创建对象
	for(var i=1;i<arr[0];i++){
		var node = document.getElementById('identity').cloneNode(true);
		node.id ="identity"+i;
		var content = document.getElementById('content');
		content.append(node);
	}
	//显示身份
	if (arr1[0]===1) {
		document.getElementById('identity').children[0].innerHTML = "杀手";
	}else{
		document.getElementById('identity').children[0].innerHTML = "平民";
	}
	document.getElementById('identity').children[1].innerHTML = 1;
	
	for(var i=1;i<arr[0];i++){
		var idcard = document.getElementById('identity'+i).children[0];
		var No = document.getElementById('identity'+i).children[1];
		if(arr1[i]===1){
			idcard.innerHTML = "杀手";
		}else{
			idcard.innerHTML = "平民";
		}
		No.innerHTML = i+1;
	}
}