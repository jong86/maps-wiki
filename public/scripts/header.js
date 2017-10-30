$(function() {
     $('[data-id="0"]').on('click', function(){
        $("#username").text("Hi, USER 1.");  
     })

     $('[data-id="1"]').on('click', function(){
        $("#username").text("Hi, USER 2.");  
     })

})