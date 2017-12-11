$(function() {

  var iconsHTML = document.cookie ? `<i id="liked{{id}}" class="fa fa-heart liked"></i><i id="changed{{id}}" class="fa fa-pencil changed"></i>` : "";
  var sourceSidebar = `<li class="map-li noselect"><span id="list{{id}}" class="map-list-item" data-id="{{id}}">{{name}}</span>` + iconsHTML + `</li>`;
  var compiledSidebarTemplate = Handlebars.compile(sourceSidebar);

  //
  // Functions
  //

  function getListOfMaps() {
    $.ajax({
      method: 'GET',
      url: '/maps'
    }).done(function (maps) {
      var data = maps;
      $('.map-list').empty();
      maps.forEach(function(data){
        var result = compiledSidebarTemplate(data);
        $('.map-list').prepend(result);
        getProfile();
      })
    })
  }

  function getProfile() {
    if (document.cookie) {
      $.ajax({
        method: 'GET',
        url: `/profiles/`,
      }).then(function (profile) {
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



  //
  // Event Listeners
  //

  $(".sidebar-toggle").click(function() {
    $("#the-sidebar").toggle("slide");
    $(this).toggleClass('.clicked');
    var button = $(this);
    if(button.hasClass('.clicked')){
      button.text('Show Menu');
    } else {
      button.text('Hide Menu');
    }
  });

  $('.form-control').change( function() {
    var filter = $(this).val();
    console.log(filter)
    if (filter) {
      $('.map-list').find("span:not(:contains(" + filter + "))").parent().slideUp();
      $('.map-list').find("span:contains(" + filter + ")").parent().slideDown();
    } else {
      $('.map-list').find("li").slideDown();
    }
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



  //
  // Initialization
  //

  if (!document.cookie){
    $("#create-new-map").css("display", "none");
  } else {
    $("#create-new-map").show();
  }

  getListOfMaps();
})