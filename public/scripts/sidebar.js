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

    var sourceSidebar = `<li><a id="list{{id}}" class="mapListItem" data-id="{{id}}" heref="">{{name}}</a><i id="liked{{id}}" class="fa fa-heart liked"></i><i id="changed{{id}}" class="fa fa-pencil changed"></i></li>`;
    var compiledSidebarTemplate = Handlebars.compile(sourceSidebar);
    
    function getListOfMaps() {
		$.ajax({
			method: 'GET',
			url: '/maps'
		}).done(function (maps) {
            var data = maps;
			$('.map-list').empty();
			maps.forEach(function(data){
                var result = compiledSidebarTemplate(data);
                $('.map-list').append(result);
                getProfile();
			})
        })   
    }
    getListOfMaps();

    function getProfile() {
        if (document.cookie) {
            $.ajax({
                method: 'GET',
                url: `/profiles/`,
            }).then(function (profile) {
                console.log(profile);
                $(".liked").show();
                $(".changed").show();
                profile.forEach(function (item){
                    if (item.favourite === true){
                        $(`#liked${item.map_id}`).css("color", "red");
                    } else {
                        $(`#liked${item.map_id}`).css("color", "");
                    }
                    if (item.changed === true){
                        $(`#changed${item.map_id}`).css("color", "orange");
                    }
                })
            })
        }    
    }
    $(document).on("click", ".mapListItem", function() {
        var id = $(this)[0].id.slice(4);
        console.log(id);
        $.ajax({
            method: 'GET',
            url: `/maps/${id}`,
        }).done(function(map) {
            $("#mapname").text(`You are looking at ${map.name}.`)
        })
    })
    
    $(document).on("click", ".liked", function() {
        var id = $(this)[0].id.slice(5);
        $.ajax({
            method: 'POST',
            url: `/favourites/${id}`,
        }).done(function(response) {
            if (response == true){
                $(`#liked${id}`).css("color", "red");
            } else {
                $(`#liked${id}`).css("color", "");
            }
        })
    })

    if (!document.cookie){
        $("#create-new-map").css("display", "none");
    } else {
        $("#create-new-map").show();
    }

})