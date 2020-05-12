function stopDate() {
	var date = new Date();
	date.setFullYear(2020, 4, 27);
	date.setHours(23);
	date.setMinutes(59);
	date.setSeconds(59);
	date.setMilliseconds(0);
	return date;
}
function stopLove() {
	$('#garden').hide();
	$('#loveHeart').css('width', '0');
	$('#words').css({
		height: '100%',
		width: '100%',
		background: 'rgba(0,0,0,.4)',
		position: 'fixed',
		top: '0',
		left: '0',
		color: 'white',
		display: 'flex',
	});
	$('#messages').after('<div style="text-align: right;">Everything will eventually become a memory.<br/>2020-05-27</div>')
}