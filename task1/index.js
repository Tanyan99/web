var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
btn1.onclick = function(){//点击开始
	c = setInterval(
		function(){start();},
		1000
		)
}
btn2.onclick = function(){
	for (var i = 0; i < div.length; i++) {
		div[i].style.background = 'orange';
	}
	clearInterval(c);
}
var	div = document.getElementsByTagName('div');
var colors=['red','plum','blue','green','cyan','black','pink','gray','brown'];
function start() {
	for (var i = 0; i < div.length; i++) {
		div[i].style.background = 'orange';
	}
	var arr = new Array(3);
	var arr1 = new Array(3);
	for (var i=0; i < arr.length; i++) {
		var a = parseInt(Math.random()*9);
		if (i == 0) {arr[i]=a;}
		else{
			for (var j = 0; j < i; j++) {
				if (a==arr[j]) {i--;}
				else{arr[i]=a;}
			}
		}
	}
	for (var i=0; i < arr1.length; i++) {
		var a = parseInt(Math.random()*9);
		if (i == 0) {arr1[i]=a;}
		else{
			for (var j = 0; j < i; j++) {
				if (a==arr1[j]) {i--;}
				else{arr1[i]=a;}
			}
		}
	}
	for (var i = 0; i < arr.length; i++) {
		div[arr[i]].style.background = colors[arr1[i]];
	}
}
