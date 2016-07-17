$(document).ready(function() {
	$('#getting-started').countdown('2016/07/28', function(event) {
		$(this).html(event.strftime('%Dd %Hh:%Mm:%Ss'));
	});
});