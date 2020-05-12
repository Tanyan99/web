window.onload = function(){
	btn1.onclick = function (){
		window.location.href = "turnover.html";
	}
	btn.onclick = function (){
		window.location.href = "flow.html";
	}
	btn2.onclick = function() {
		window.location.href = "flow.html";
	}
	var temp = getsession();
	var arr = temp[0];
	var arr0 = temp[1];
	var arr1 = temp[2];
	display(arr,arr0,arr1);
}


function getsession() {
	var temp = sessionStorage.arr;
	var arr = JSON.parse(temp);
	console.log(arr);
	temp = sessionStorage.arr0;
	var arr0 = JSON.parse(temp)
	console.log(arr0);
	temp = sessionStorage.arr1;
	var arr1 = JSON.parse(temp)
	console.log(arr1);
	return [arr,arr0,arr1];
}
function display(arr,arr0,arr1) {
	//创建对象
	for (var i = 0; i < arr[0]; i++) {
		var node = document.getElementById('identity').cloneNode(true);
		node.id = "identity" + i;
		node.children[0].id = "idcard"+i;
		node.children[1].id = "No"+i;
		var content = document.getElementById('content');
		content.append(node);

		//显示身份
		var idcard = document.getElementById('idcard' + i);
		var No = document.getElementById('No' + i);
		if (arr0[i] === 1) {
			idcard.innerHTML = "杀手";
		} else {
			idcard.innerHTML = "平民";
		}
		No.innerHTML = i + 1 + '号';

		//已死角色显示灰色
		if (arr1[i] == -1) {
			idcard.style.background = 'rgb(26,153,183,0.52)';
			document.getElementById('btn').style.display = 'none';
			btn1.onclick = null;
			btn1.onclick = function (){
				window.location.href = "flow.html";
			}
		}
	}
}
