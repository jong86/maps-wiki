$(function() {
    $(".sidebar-toggle" ).click(function() {
      $(".sidebar-nav").animate({width: 'toggle'});
    })

    $('.form-control').change( function () {
        var filter = $(this).val();
        console.log(filter)
        if (filter) {
          $('.map-list').find("a:not(:contains(" + filter + "))").parent().slideUp();
          $('.map-list').find("a:contains(" + filter + ")").parent().slideDown();
        } else {
          $('.map-list').find("li").slideDown();
        }
    })
})