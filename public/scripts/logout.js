$(function () {
	$('#logout-button').click(function (event) {
		$.ajax({
			method: 'DELETE',
			url: '/login'
		});
	})
})