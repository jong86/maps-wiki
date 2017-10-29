$(function() {
    if (!document.cookie) {
    $(".navbar-middle").hide();
    } else{
        $(".navbar-middle").show();
    }
})