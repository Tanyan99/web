$(document).ready(function() {
	$("#btn1").click(function() {
		window.location.href = "check.html";
	});
	$("#over").click(function() {
		window.location.href = "index.html";
	});
	$("#check").click(function() {
		window.location.href = "check.html";
	});

	step.initialize();
	detection(step.days);
	addFlowchart();
});


var step = {　　
	//第n天
	days: 1.0,    
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
				step.days += 0.5;
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
				step.days += 0.5;
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

			$('#flowchart #killing').unbind('click').one("click", step.transition);
			$('#flowchart #lastWords').unbind('click').click(function() {alert('请按步骤操作！');});
			$('#flowchart #speak').unbind('click').click(function() {alert('请按步骤操作！');});
			$('#flowchart #vote').unbind('click').click(function() {alert('请按步骤操作！');});
			break;

		case "lastWords"://亡者遗言
			$('#flowchart #lastWords').unbind('click').one("click", step.transition);
			$('#flowchart #killing').unbind('click').click(function() {alert('请按步骤操作！');});
			$('#flowchart #speak').unbind('click').click(function() {alert('请按步骤操作！');});
			$('#flowchart #vote').unbind('click').click(function() {alert('请按步骤操作！');});
			break;

		case "speak"://依次发言
			$('#flowchart #speak').unbind('click').one("click", step.transition);
			$('#flowchart #lastWords').unbind('click').click(function() {alert('请按步骤操作！');});
			$('#flowchart #killing').unbind('click').click(function() {alert('请按步骤操作！');});
			$('#flowchart #vote').unbind('click').click(function() {alert('请按步骤操作！');});
			break;

		case "vote"://全民投票
			$('#flowchart #vote').unbind('click').one("click", step.transition);
			$('#flowchart #lastWords').unbind('click').click(function() {alert('请按步骤操作！');});
			$('#flowchart #speak').unbind('click').click(function() {alert('请按步骤操作！');});
			$('#flowchart #killing').unbind('click').click(function() {alert('请按步骤操作！');});
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
			$('#flowchart #vote').css('background-color', '#92b7a5');
			$('#flowchart #vote div').css('border-right', '5vh solid #92b7a5');
		case "speak":
			$('#flowchart #speak').css('background-color', '#92b7a5');
			$('#flowchart #speak div').css('border-right', '5vh solid #92b7a5');
		case "lastWords":
			$('#flowchart #lastWords').css('background-color', '#92b7a5');
			$('#flowchart #lastWords div').css('border-right', '5vh solid #92b7a5');
		case "killing":
			$('#flowchart #killing').css('background-color', '#92b7a5');
			$('#flowchart #killing div').css('border-right', '5vh solid #92b7a5');
			break;
		default:
			console.log('Invalid State!');
			break;
	}
}

function killing(){
	var arr = sessionStorage.arr;
	//console.log(arr);
	var arr0 = sessionStorage.arr1;
	//console.log(arr1);
	if (arr == undefined || arr0 == undefined) {alert('false!请重新设置玩家人数！');}
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
				$('#flowchart #speak').css('background-color', '#92b7a5');
				$('#flowchart #speak div').css('border-right', '5vh solid #92b7a5');
			case "speak":
				$('#flowchart #lastWords').css('background-color', '#92b7a5');
				$('#flowchart #lastWords div').css('border-right', '5vh solid #92b7a5');
			case "lastWords":
				$('#flowchart #killing').css('background-color', '#92b7a5');
				$('#flowchart #killing div').css('border-right', '5vh solid #92b7a5');
				break;		}
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
	var arr0 = JSON.parse(window.sessionStorage.arr0);
	var arr1 = JSON.parse(window.sessionStorage.arr1);
	console.log(days,arr,arr0,arr1);
	var days = Math.floor(days);
	var i = 1;
	while (--days) {
		var node = document.getElementById('day1').cloneNode(true);
		var node0 = document.getElementById('flowchart').cloneNode(true);
		node.id = "day" + (i+1);
		node.children[0].innerHTML = "第"+(i+1)+"天";
		node0.className = 'flowchart';
		node0.id = 'flowchart'+i;
		var content = document.getElementById('day'+i);
		content.after(node);
		content.after(node0);
		i++;
	}
	if (arr[1]==0 || arr[1]>=arr[2]) {
		window.location.href = "gameover.html";
	}
}
function addFlowchart(){
	$('.days').on('click', function() {
			var flag = $(this).next().css('display');
			if (flag == "none") {
				$(this).next().css('display','flex');
			}
			else{
				$(this).next().css('display','none');
			}
		});}
