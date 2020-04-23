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
function dianji(arr,i) {
	var k = arr[0];
	if (i < k+1) {
		No.innerHTML = i ;
		bianhao.innerHTML = i;
		i++ ;
	}
	return i;
}
var fanhui = getsession(arr,arr1);
var arr = fanhui[0];
var arr1 = fanhui[1];
var i=1;