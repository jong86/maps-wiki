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
                // Success
                $("#login-button").hide();
                $("#logout-button").show();
    	    }.done()  
		});
	});