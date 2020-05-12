$(document).ready(function() {
	/*$("#btn1").click(function() {
		window.location.href = "flow.html" ;
	});*/
	

	var temp = getSession();
	var arr = temp[0];
	var arr0 = temp[1];
	var arr1 = temp[2];
	var dead = detection(arr1);
	
	display(arr,arr0,arr1);
	killing(arr,arr1);

	$("#btn").click(function() {
		var dead0 = detection(arr1);
		if (dead0 == dead +1) {
			logData(arr1);
			setSession(arr,arr1);
			window.location.href = "flow.html" ;
		}
		else if (dead0 == dead) {
			alert("请选择击杀对象，并击杀");
		}
		else if (dead0 > dead+1) {
			alert("一次仅只能击杀一名对象");
		}
	});
});

function display(arr,arr0,arr1) {
	//创建对象
	for (var i = 0; i < arr[0]; i++) {
		var node = document.getElementById('identity').cloneNode(true);
		node.id = "identity" + i;
		node.children[0].id = "idcard"+i;
		node.children[1].id = "No"+i;
		node.children[2].id = "kill"+i;
		var content = document.getElementById('id');
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
		}
	}
}
function killing(arr,arr1) {
	var ifbool = [].concat(arr1);
	var days = JSON.parse(window.sessionStorage.days);
	$(".identity").on('click', 'img', function() {
		var kill = $(this).prevAll('.idcard');
		var number = $(this).prevAll('.No');
		var killed = parseInt(number.text())-1;

		if (arr1[killed] == -1&&ifbool[killed] == -1) {
			alert('该名玩家已死亡');
		}
		else if(arr1[killed] == -1 && ifbool[killed] !== -1) {
			kill.css('background','none');
			arr1[killed] = ifbool[killed];
			if (arr1[killed] == 0) {arr[2] += 1 ; }
			else{arr[1] += 1 ;}
			console.log('返回');
			console.log(arr);
			console.log(arr1);
		}
		else if (days == 1.5 && ifbool[killed] == 1) {
			alert("第一晚狼人不能自杀");
		}
		else{
			kill.css('background', 'rgb(26,153,183,0.52)');
			console.log('杀死'+number.text());
			if (arr1[killed] == 0) {arr[2] -= 1 ; }
			else{arr[1] -= 1 ;}
			arr1[killed] = -1;
			console.log(arr);
			console.log(arr1);
		}
	});
}
function detection (arr1){
	var dead = 0;
	for (var i = 0; i < arr1.length; i++) {
		if(arr1[i] == -1){dead++;}
	}
	console.log("已死亡人数："+dead);
	return	dead;
}
function logData(arr1){
	var ifbool = JSON.parse(window.sessionStorage.arr1);
	var days = JSON.parse(window.sessionStorage.days);
	var killed;
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] == -1 && ifbool[i] !== -1) {
			killed=i;
			idcard=ifbool[i];
		}
	}
	var logData = new Array ();
	if (window.sessionStorage.logData) {
		logData=JSON.parse(window.sessionStorage.logData)
	}
	var log = [days,killed+1,idcard];
	logData.push(log);
	window.sessionStorage.logData = JSON.stringify(logData);
	console.log(window.sessionStorage.logData);
}

function getSession() {
	var arr = JSON.parse(sessionStorage.arr);
	console.log(arr);
	var arr0 = JSON.parse(sessionStorage.arr0)
	console.log(arr0);
	var arr1 = JSON.parse(sessionStorage.arr1)
	console.log(arr1);
	return [arr, arr0,arr1];
}
function setSession(arr,arr1){
	window.sessionStorage.arr = JSON.stringify(arr) ;
	window.sessionStorage.arr1 = JSON.stringify(arr1) ;
}