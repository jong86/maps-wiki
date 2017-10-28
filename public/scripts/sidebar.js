$(function() {

    $(".sidebar-toggle").click(function() {
      $(".sidebar-nav").animate({width: 'toggle'});
      $(this).toggleClass('.clicked');
      var button = $(this);
      if(button.hasClass('.clicked')){
          button.text('Show Menu');         
      } else {  
          button.text('Hide Menu');
      }
    });

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

    var sourceSidebar = `<li><i class="fa fa-heart liked" hidden="hidden"></i><i class="fa fa-pencil edited" hidden="hidden"></i>
    <a class="mapListItem" data-id="{{id}}" heref="">{{name}}</a></li>`;
    var compiledSidebarTemplate = Handlebars.compile(sourceSidebar);
    
    function getListOfMaps() {
		$.ajax({
			method: 'GET',
			url: '/maps'
		}).done(function (maps) {
            var data = maps;
			$('.map-list').empty();
			maps.forEach(function(data){
                var result= compiledSidebarTemplate(data);
                $('.map-list').append(result);
			})
        })   
    }
    getListOfMaps();

    function createMap(){
        $("#create-new-map").show().focus();
    }
    
    $(".create-map-btn").click(function() {
        console.log("hi");
        createMap();
    })

        // if (document.cookie) {
        //     $.ajax({
        // 		method: 'GET',
        //         url: `/profiles/${user_id}`,
        // 	}).then(function (maps) {
        //         maps.forEach(function(item) {
        //             $(".liked").show();
        //             $(".edited").show();
        //             if (favouite === true){
        //                 $(".liked").css("color", "red");
        //             }
        //             if (changed === true){
        //                 $(".edited").css("color", "green");
        //             }
                    


    
})