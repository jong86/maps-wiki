$(function () {
    //login 
	$('.login-form').on('submit', function (event) {
		var emailLength = $(".email-field").val().length;
		var passwordLength = $(".password-field").val().length;
		event.preventDefault();
		if ((emailLength || passwordLength) <= 0) {
			alert("You can't leave it blank!")
			return;
		}
		var form = this;
		$.ajax({
			method: 'POST',
			url: '/login',
		    success: function(response){
		      $(".dropdown").hide();
              $("#logout-button").show()
            }
		});
    });
    

    //logout
    $('#logout-button').click(function (event) {
		$.ajax({
			method: 'DELETE',
            url: '/login',
            success: function(response){
                $("#logout-button").hide();
                $(".dropdown").show();
            }
		});
	})
})
	