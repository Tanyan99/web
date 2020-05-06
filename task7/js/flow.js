$(document).ready(function() {
	$("#btn1").click(function() {
		window.location.href = "check.html";
	});

	

	step.initialize();
	detection(step.days);
});


var step = {　　
	//第n天
	days: 1,    
	// 当前状态
	currentState: 'killing',

	// 绑定事件
	initialize: function() {
		//console.log('正常');
		getSession_currentState();
		step.createClick();
	},

	// 状态转换
	transition: function(event){
		setClicked();
		switch(step.currentState) {
			case "killing"://杀手杀人
				step.currentState = 'lastWords';
				killing();
				//console.log('killing');
				break;

			case "lastWords"://亡者遗言
				step.currentState = 'speak';
				alert('请死者亮明身份并发言')
				//console.log('lastWords');
				break;

			case "speak"://依次发言
				step.currentState = 'vote';
				alert('玩家依次发言')
				//console.log('speak');
				break;

			case "vote"://全民投票
				step.currentState = 'killing';
				step.days += 1;
				killing();
				//console.log('vote');
				break;

			default:
				console.log('Invalid State!');
				break;
		}
		step.createClick();
		window.sessionStorage.currentState = step.currentState;
		window.sessionStorage.days = step.days;
	},
	//创建点击事件
	createClick: function (){
		switch(step.currentState) {
		case "killing"://杀手杀人
			$('#killing').one("click", step.transition);
			break;

		case "lastWords"://亡者遗言
			$('#lastWords').one("click", step.transition);
			break;

		case "speak"://依次发言
			$('#speak').one("click", step.transition);
			break;

		case "vote"://全民投票
			$('#vote').one("click", step.transition);
			break;

		default:
			console.log('Invalid State!');
			break;
		}
	},
};
//改变点击状态
function setClicked() {
	switch(step.currentState) {
		case "vote" :
			$('#vote').css('background-color', '#92b7a5');
			$('#vote div').css('border-right', '5vh solid #92b7a5');
		case "speak":
			$('#speak').css('background-color', '#92b7a5');
			$('#speak div').css('border-right', '5vh solid #92b7a5');
		case "lastWords":
			$('#lastWords').css('background-color', '#92b7a5');
			$('#lastWords div').css('border-right', '5vh solid #92b7a5');
		case "killing":
			$('#killing').css('background-color', '#92b7a5');
			$('#killing div').css('border-right', '5vh solid #92b7a5');
			break;
		default:
			console.log('请按步骤操作');
			break;
	}
}

function killing(){
	var arr = sessionStorage.arr;
	//console.log(arr);
	var arr1 = sessionStorage.arr1;
	//console.log(arr1);
	if (arr == undefined || arr1 == undefined) {alert('false!请重新设置玩家人数！');}
	else {
		window.location.href = "killing.html";
	}
	//window.open("killing.html");
}

function getSession_currentState() {
	var Session_currentState = window.sessionStorage.currentState;
	var days = window.sessionStorage.days;
	if (Session_currentState) {
		step.currentState = Session_currentState;
		switch(step.currentState) {
			case "vote" :
				$('#speak').css('background-color', '#92b7a5');
				$('#speak div').css('border-right', '5vh solid #92b7a5');
			case "speak":
				$('#lastWords').css('background-color', '#92b7a5');
				$('#lastWords div').css('border-right', '5vh solid #92b7a5');
			case "lastWords":
				$('#killing').css('background-color', '#92b7a5');
				$('#killing div').css('border-right', '5vh solid #92b7a5');
				break;
			/*case "killing":
				$('#speak').css('background-color', '#24a7c6');
				$('#speak div').css('border-right', '5vh solid #24a7c6');
				$('#lastWords').css('background-color', '#24a7c6');
				$('#lastWords div').css('border-right', '5vh solid #24a7c6');
				$('#killing').css('background-color', '#24a7c6');
				$('#killing div').css('border-right', '5vh solid #24a7c6');
				break;*/
		}
	} else {
		console.log('请按步骤操作');
	}
	if (days) {
		step.days = JSON.parse(days);
		console.log("第"+days+"天")
	}
	else{
		console.log('第1天');
	}
}
function detection (days){
	var arr = JSON.parse(window.sessionStorage.arr);
	var arr1 = JSON.parse(window.sessionStorage.arr1);
	console.log(days,arr,arr1);
	var i = 2;
	while (--days) {
		var node = document.getElementById('day1').cloneNode(true);
		node.id = "day" + i;
		node.children[0].innerHTML = "第"+i+"天";
		var content = document.getElementById('day'+(i-1));
		content.after(node);
		i++;
		if (arr[1]==0 || arr[1]>=arr[2]) {
			window.location.href = "gameover.html";
		}
	}
}
